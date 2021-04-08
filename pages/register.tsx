import { useRouter } from 'next/router';
import Image from 'next/image';
import { gql, useMutation } from '@apollo/client';
import Cookies from 'js-cookie';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import useForm from '@/lib/useForm';
import DisplayError from '@/components/DisplayError';

const REGISTER_MUTATION = gql`
  mutation REGISTER_MUTATION(
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        id
      }
    }
  }
`;

function RegisterPage() {
  const { inputs, onChange, clearForm } = useForm({
    email: '',
    username: '',
    password: '',
  });
  const [registerUser, { loading, error }] = useMutation(REGISTER_MUTATION, {
    variables: inputs,
  });

  async function register() {
    try {
      const { data } = await registerUser();
      Cookies.set('token', data.register.jwt);
      clearForm();
      window.location.href = '/';
    } catch {}
  }

  return (
    <Container>
      <Row>
        <Col sm='12' md={{ size: 5, offset: 3 }}>
          <div className='paper'>
            <div className='header'>
              <Image src='/logo.png' width='220' height='100' />
            </div>
            <section className='wrapper'>
              <DisplayError error={error} />
              <Form>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Username:</Label>
                    <Input
                      disabled={loading}
                      onChange={onChange}
                      value={inputs.username}
                      type='text'
                      name='username'
                      style={{ height: 50, fontSize: '1.2em' }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input
                      onChange={onChange}
                      value={inputs.email}
                      type='email'
                      name='email'
                      style={{ height: 50, fontSize: '1.2em' }}
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password:</Label>
                    <Input
                      onChange={onChange}
                      value={inputs.password}
                      type='password'
                      name='password'
                      style={{ height: 50, fontSize: '1.2em' }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <span>
                      <a href=''>
                        <small>Forgot Password?</small>
                      </a>
                    </span>
                    <Button
                      style={{ float: 'right', width: 120 }}
                      color='primary'
                      disabled={loading}
                      onClick={register}
                    >
                      {loading ? 'Loading..' : 'Submit'}
                    </Button>
                  </FormGroup>
                </fieldset>
              </Form>
            </section>
          </div>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            border-radius: 6px;
            margin-top: 90px;
          }
          .notification {
            color: #ab003c;
          }
          .header {
            width: 100%;
            height: 120px;
            background-color: #2196f3;
            margin-bottom: 30px;
            border-radius-top: 6px;
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
          a {
            color: blue !important;
          }
          img {
            margin: 15px 30px 10px 50px;
          }
        `}
      </style>
    </Container>
  );
}

export default RegisterPage;
