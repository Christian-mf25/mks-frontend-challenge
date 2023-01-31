import { useDispatch } from "react-redux";

import { addToCart, decrease, removeFromCart } from "../../store/modules/Cart";
import { CartCard, CloseButton, Quantity } from "./style";
import { IProduct } from "../../store/modules/Products";

const CartProduct = ({ id, photo, name, price, quantity }: IProduct) => {
	const roundPrice = price.split(".")[0]
  const halfStr = Math.floor(roundPrice.length / 3);	
	const formattedPrice = roundPrice.length > 3 ? roundPrice.substr(0, halfStr) + "." + roundPrice.substr(halfStr) : roundPrice
  const rewrittenPrice = `R$${formattedPrice}`;
  const dispatch = useDispatch();

  return (
    <>
      <CartCard data-testid="cart-card">

        <img src={photo} alt={name} />
        <p className="product-name">{name}</p>

        <section className="quantity-price">
          <Quantity>
            <div className="quantity-buttons">
              <button
                onClick={() => dispatch(decrease({ id }))}
                className="quantity sub"
              >
                -
              </button>
              <span className="split"></span>
              <p data-testid="quantity-product" className="quantity">{quantity}</p>
              <span className="split"></span>
              <button
                onClick={() => dispatch(addToCart({ id }))}
                className="quantity add"
              >
                +
              </button>
            </div>
          </Quantity>

          <p className="price">{rewrittenPrice}</p>
        </section>

        <CloseButton className="remove-cart-button"
          onClick={() => dispatch(removeFromCart({ id }))}
          close="card"
          dimension="small"
          font="small"
        >
          X
        </CloseButton>
      </CartCard>
    </>
  );
};

export default CartProduct;


// it("should  be able to remove product from cart", async () => {
// 	const { queryByTestId, getByTestId, findByText } = render(
// 		<BrowserRouter>
// 			<Provider store={store}>
// 				<App />
// 			</Provider>
// 		</BrowserRouter>
// 	);

// 	const openModal = getByTestId("open-modal");
// 	await user.click(openModal);

// 	const removeFromCartButton = await findByText("-");
// 	await user.click(removeFromCartButton);

// 	expect(queryByTestId("cart-card")).not.toBeInTheDocument();
// });



// it("should  be able to increase product in cart", async () => {
// 	const { getByTestId, findByText } = render(
// 		<BrowserRouter>
// 			<Provider store={store}>
// 				<App />
// 			</Provider>
// 		</BrowserRouter>
// 	);
		
// 	const openModal = getByTestId("open-modal");
// 	await user.click(openModal);

// 	const increaseFromCartButton = await findByText("+");
// 	await user.click(increaseFromCartButton);

// 	expect(getByTestId("quantity-product")).toBe(2);
// });