/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/prefer-screen-queries */

import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { debug } from "console";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "../../App";
import store from "../../store";

describe("Modal Component", () => {
  const user = userEvent.setup();

  it("should be able to open modal", async () => {
    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    const openModal = getByTestId("open-modal");
    await user.click(openModal);
    expect(getByText("Total:")).toBeInTheDocument();
  });

  it("should be able to close modal", async () => {
    const { getByTestId, queryByText, findByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    const openModal = getByTestId("open-modal");
    await user.click(openModal);

    const closeModal = await findByTestId("close-modal");
    await user.click(closeModal);

    await waitFor(() => {
      expect(queryByText("Total:")).not.toBeInTheDocument();
    });
  });
});

describe("CartModal Component", () => {
  const user = userEvent.setup();

  it("should  be able to add product to cart", async () => {
    const { findAllByText, getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    const buyProductButton = await waitFor(() => findAllByText("Comprar"));
    await user.click(buyProductButton[buyProductButton.length - 1]);

    const openModal = getByTestId("open-modal");
    await user.click(openModal);

    expect(getByTestId("cart-card")).toBeInTheDocument();
  });

  it("should  be able to increase product in cart", async () => {
    const { getByTestId, findByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    const openModal = getByTestId("open-modal");
    await user.click(openModal);

    const increaseFromCartButton = await findByText("+");
    await user.click(increaseFromCartButton);

    expect(getByTestId("quantity-product").ATTRIBUTE_NODE).toBe(2);
  });

  it("should  be able to add up the total price", async () => {
    const { findAllByText, getByTestId, getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    const buyProductButton = await waitFor(() => findAllByText("Comprar"));
    await user.click(buyProductButton[0]);

    const openModal = getByTestId("open-modal");
    await user.click(openModal);

    expect(getByText("R$17.600")).toBeInTheDocument();
  });
});
