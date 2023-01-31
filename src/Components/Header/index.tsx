import { useSelector } from "react-redux";

import { IModal } from "../../Pages/Dashboard";
import { CartIcon } from "../../Icons/Vector";
import { RootState } from "../../store";
import { Head, Logo } from "./style";

const Header = ({ setModalAnimation, modalAnimation }: IModal) => {
  const { itemsInCart } = useSelector((state: RootState) => state.cart);

  return (
    <Head>
      <Logo onClick={() => setModalAnimation(0)}>
        <p className="first-name">MKS</p>
        <p className="middle-name">Sistemas</p>
      </Logo>
      <button
        data-testid="open-modal"
        onClick={() =>
          modalAnimation ? setModalAnimation(0) : setModalAnimation(1)
        }
        className="cart-button"
      >
        <CartIcon />
        <p className="count-cart">{itemsInCart}</p>
      </button>
    </Head>
  );
};

export default Header;
