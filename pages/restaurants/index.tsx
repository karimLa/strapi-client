import { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Col, Input, InputGroup, InputGroupAddon, Row } from 'reactstrap';

import { addApolloState, initializeApollo } from '@/lib/apolloClient';
import RestaurantList, { RESTAURANTS_QUERY } from '@/components/Restaurants';

export default function Home({ restaurants }) {
  const [query, updateQuery] = useState('');

  return (
    <div>
      <Head>
        <title>Shokuji</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container-fluid'>
        <Row>
          <Col>
            <div className='search'>
              <InputGroup>
                <InputGroupAddon addonType='append'> Search </InputGroupAddon>
                <Input
                  onChange={(e) =>
                    updateQuery(e.target.value.toLocaleLowerCase())
                  }
                  value={query}
                />
              </InputGroup>
            </div>
            <RestaurantList restaurants={restaurants} search={query} />
          </Col>
        </Row>
        <style jsx>
          {`
            .search {
              margin: 20px;
              width: 500px;
            }
          `}
        </style>
      </main>
    </div>
  );
}

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
