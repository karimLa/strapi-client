import { GetStaticProps } from 'next';

import { addApolloState, initializeApollo } from '@/lib/apolloClient';
import { RESTAURANTS_QUERY } from '@/components/Restaurants';
export { default } from './restaurants';

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: RESTAURANTS_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {
      restaurants: data.restaurants,
    },
    revalidate: 1,
  });
};
