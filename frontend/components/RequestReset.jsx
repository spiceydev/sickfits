import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

export const RESET_REQUEST_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      message
      code
    }
  }
`;

const RequestReset = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });
  const [requestReset, { data, loading, error }] = useMutation(
    RESET_REQUEST_MUTATION,
    {
      variables: {
        email: inputs.email,
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await requestReset().catch((err) => {});
    resetForm();
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      <DisplayError error={error} />
      <fieldset aria-busy={loading} disabled={loading}>
        {data?.sendUserPasswordResetLink === null ? (
          <p>Success, check your email for a link to reset your password.</p>
        ) : (
          <>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email Address"
                autoComplete="email"
                value={inputs.email}
                onChange={handleChange}
              />
            </label>

            <button type="submit">Reset Password</button>
          </>
        )}
      </fieldset>
    </Form>
  );
};

export default RequestReset;
