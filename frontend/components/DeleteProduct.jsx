import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';

const DELET_PRODUCT_MUTATION = gql`
  mutation DELET_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct));
};

const DeleteProduct = ({ id, children }) => {
  const [buttonText, setButtonText] = useState(children);
  const [deleteProduct, { loading }] = useMutation(DELET_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });

  return (
    <button
      type="button"
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          setButtonText('Deleting...');
          deleteProduct();
        }
      }}
      disabled={loading}
    >
      {buttonText}
    </button>
  );
};

export default DeleteProduct;
