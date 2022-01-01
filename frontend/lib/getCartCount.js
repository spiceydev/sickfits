export const getCartCount = (cart) =>
  cart.reduce(
    (tally, cartItem) => tally + (cartItem.product ? cartItem.quantity : 0),
    0
  );
