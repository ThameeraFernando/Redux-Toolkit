import CartContainer from "./components/CartContainer";
import NavBar from "./components/NavBar";
import { useEffect } from "react";
import { calculateTotals } from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);
  return (
    <main>
      <NavBar />
      <CartContainer />
    </main>
  );
}
export default App;
