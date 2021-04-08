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
import { CURRENT_USER_QUERY } from '@/lib/useUser';

const LOGIN_MUTATION = gql`
  mutation login_mutation($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
      }
    }
  }
`;

function LoginPage() {
  const { inputs, onChange, clearForm } = useForm({
    identifier: '',
    password: '',
  });
  const [loginUser, { error, loading }] = useMutation(LOGIN_MUTATION, {
    variables: inputs,
  });

  async function login() {
    try {
      const { data } = await loginUser();
      Cookies.set('token', data.login.jwt);
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
                    <Label>Email:</Label>
                    <Input
                      onChange={onChange}
                      name='identifier'
                      style={{ height: 50, fontSize: '1.2em' }}
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password:</Label>
                    <Input
                      onChange={onChange}
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
                      onClick={login}
                    >
                      {loading ? 'Loading... ' : 'Submit'}
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

export default LoginPage;
