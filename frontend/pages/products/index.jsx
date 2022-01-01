import { useRouter } from 'next/dist/client/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

const ProductsPage = ({ query }) => {
  const router = useRouter();
  const page = parseInt(query.page, 10) || 1;
  return (
    <div>
      <Pagination page={page} />
      <Products page={page} />
      <Pagination page={page} />
    </div>
  );
};

export default ProductsPage;
