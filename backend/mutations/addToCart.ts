import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

export const addToCart = async (
  _root: undefined,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> => {
  // get the current user
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to add to cart');
  }

  // get the users cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: {
      user: { id: sesh.itemId },
      product: { id: productId },
    },
    resolveFields: 'id, quantity',
  });
  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    return context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: {
        quantity: parseInt(existingCartItem.quantity) + 1,
      },
    });
  }
  return context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: sesh.itemId } },
    },
  });
};
