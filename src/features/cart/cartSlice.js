import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openModal } from "../modal/modalSlice";
// import cartItems from "../../cartItems";
const url = "https://course-api.com/react-useReducer-cart-project";
const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

// export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
//   return fetch(url)
//     .then((resp) => resp.json())
//     .catch((error) => console.log(error));
// });

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    try {
      //   console.log(name);
      //   console.log(thunkAPI);
      //   console.log(thunkAPI.getState());
      //   thunkAPI.dispatch(openModal());
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

//immer library handle the states when we are changing the state
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      //   return {} change the whole state
    },
    removeItem: (state, action) => {
      //   console.log(action);
      const ItemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== ItemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
    },
  },
});

// console.log(cartSlice);

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
