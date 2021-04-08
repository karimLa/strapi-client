import { useState } from 'react';
import Head from 'next/head';
import { Col, Input, InputGroup, InputGroupAddon, Row } from 'reactstrap';

import RestaurantList from '@/components/Restaurants';

export default function Home() {
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
            <RestaurantList search={query} />
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
