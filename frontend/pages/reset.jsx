import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

const ResetPage = ({ query }) => {
  if (!query?.token) {
    return (
      <>
        <p>Sorry you must supply a token</p>
        <RequestReset />
      </>
    );
  }
  return (
    <div>
      <Reset token={query.token} />
    </div>
  );
};

export default ResetPage;
