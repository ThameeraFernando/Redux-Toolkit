import CartContainer from "./components/CartContainer";
import NavBar from "./components/NavBar";
import { useEffect } from "react";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./components/Modal";
function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(calculateTotals());
    dispatch(getCartItems("random"));
  }, []);
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);
  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <main>
      {isOpen && <Modal />}
      <NavBar />
      <CartContainer />
    </main>
  );
}
export default App;
