import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

export const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $email: String!
    $password: String!
    $name: String!
  ) {
    createUser(data: { email: $email, password: $password, name: $name }) {
      id
      email
      name
    }
  }
`;

const SignUp = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    name: '',
  });
  const [signUp, { data, loading, error }] = useMutation(SIGN_UP_MUTATION, {
    variables: {
      email: inputs.email,
      password: inputs.password,
      name: inputs.name,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp().catch((err) => {});
    resetForm();
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up For An Account</h2>
      <DisplayError error={error} />
      <fieldset aria-busy={loading} disabled={loading}>
        {data?.createUser ? (
          <p>
            Signed up with {data.createUser.email} - Please go ahead and sign
            in!
          </p>
        ) : (
          <>
            <label htmlFor="email">
              Your Name
              <input
                type="test"
                name="name"
                id="name"
                placeholder="Your Name"
                autoComplete="name"
                value={inputs.name}
                onChange={handleChange}
              />
            </label>

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

            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Your password"
                autoComplete="password"
                value={inputs.password}
                onChange={handleChange}
              />
            </label>
            <button type="submit">submit</button>
          </>
        )}
      </fieldset>
    </Form>
  );
};

export default SignUp;
