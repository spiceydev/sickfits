export const calcTotalPrice = (cart) =>
  cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally; // products can be deleted but can still be in a cart
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
