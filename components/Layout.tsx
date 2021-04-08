import Head from 'next/head';
import Link from 'next/link';
import { Container, Nav, NavItem } from 'reactstrap';

import useUser, { logout } from '@/lib/useUser';

export default function Layout({ children }) {
  const user = useUser();
  const title = 'Welcome to Nextjs';

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <script src='https://js.stripe.com/v3' />
      </Head>
      <header>
        <style jsx>
          {`
            a {
              color: white;
            }
          `}
        </style>
        <Nav className='navbar navbar-dark bg-dark'>
          <NavItem>
            <Link href='/'>
              <a className='navbar-brand'>Home</a>
            </Link>
          </NavItem>

          <NavItem className='ml-auto'>
            {user ? (
              <h5>{user.username}</h5>
            ) : (
              <Link href='/register'>
                <a className='nav-link'> Sign up</a>
              </Link>
            )}
          </NavItem>
          <NavItem>
            {user ? (
              <Link href='/'>
                <a className='nav-link' onClick={() => logout()}>
                  Logout
                </a>
              </Link>
            ) : (
              <Link href='/login'>
                <a className='nav-link'>Sign in</a>
              </Link>
            )}
          </NavItem>
        </Nav>
      </header>
      <Container>{children}</Container>
    </div>
  );
}
