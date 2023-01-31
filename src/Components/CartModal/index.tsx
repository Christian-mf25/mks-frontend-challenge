import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { IProduct } from "../../store/modules/Products";
import { getTotalCart } from "../../store/modules/Cart";
import { IModal } from "../../Pages/Dashboard";
import { CloseButton, Modal } from "./style";
import { RootState } from "../../store";
import CartProduct from "./CartProduct";

const ModalCart = ({ setModalAnimation, modalAnimation }: IModal) => {
  const dispatch = useDispatch();
  const { cart, cartTotal } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(getTotalCart());
  }, [cart, dispatch]);

  useEffect(() => {
    const handleEsc = (event: any) => {
      if (event.keyCode === 27) {
        modalAnimation ? setModalAnimation(0) : setModalAnimation(1);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  });

  return (
    <Modal $action={modalAnimation}>
      <div className="modal-header flex-items">
        <p>Carrinho de compras</p>
        <CloseButton
					data-testid="close-modal"
          className="close-button"
          onClick={() =>
            modalAnimation ? setModalAnimation(0) : setModalAnimation(1)
          }
          close="modal"
          dimension="big"
          font="big"
        >
          X
        </CloseButton>
      </div>

      <ul className="cart-list">
        {cart.map((item: IProduct) => (
          <CartProduct
            key={item.id}
            id={item.id}
            name={item.name}
            photo={item.photo}
            price={item.price}
            quantity={item.quantity}
          />
        ))}
      </ul>

      <div className="total-cart flex-items">
        <p>Total:</p>
        <p>{cartTotal}</p>
      </div>
      <button className="checkout">Finalizar a Compra</button>
    </Modal>
  );
};

export default ModalCart;
