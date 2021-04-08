import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useApollo } from '@/lib/apolloClient';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps);

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
