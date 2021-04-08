import { GetStaticPaths, GetStaticProps } from 'next';
import { gql } from '@apollo/client';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';

import { addApolloState, initializeApollo } from '@/lib/apolloClient';
import { RESTAURANTS_QUERY } from '@/components/Restaurants';

const GET_RESTAURANT_DISHES = gql`
  query($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;

function RestaurantDishes({ restaurant }) {
  return (
    <>
      <h1>{restaurant.name}</h1>
      <Row>
        {restaurant.dishes.map((res) => (
          <Col xs='6' sm='4' style={{ padding: 0 }} key={res.id}>
            <Card style={{ margin: '0 10px' }}>
              <CardImg
                top={true}
                style={{ height: 250, objectFit: 'cover' }}
                src={res.image.url}
              />
              <CardBody>
                <CardTitle>{res.name}</CardTitle>
                <CardText>{res.description}</CardText>
              </CardBody>
              <div className='card-footer'>
                <Button outline color='primary'>
                  + Add To Cart
                </Button>

                <style jsx>
                  {`
                    a {
                      color: white;
                    }
                    a:link {
                      text-decoration: none;
                      color: white;
                    }
                    .container-fluid {
                      margin-bottom: 30px;
                    }
                    .btn-outline-primary {
                      color: #007bff !important;
                    }
                    a:hover {
                      color: white !important;
                    }
                  `}
                </style>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: RESTAURANTS_QUERY,
  });

  const paths = data.restaurants.map(({ id }) => ({ params: { id } }));

  return addApolloState(apolloClient, {
    paths,
    fallback: 'blocking',
  });
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let id = params!.id;

  if (!id || Array.isArray(id)) {
    return {
      notFound: true,
    };
  }

  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_RESTAURANT_DISHES,
    variables: { id },
  });

  return addApolloState(apolloClient, {
    props: {
      restaurant: data.restaurant,
    },
    revalidate: 1,
  });
};

export default RestaurantDishes;
