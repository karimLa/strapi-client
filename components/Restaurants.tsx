import Link from 'next/link';
import { gql } from '@apollo/client';
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';

export const RESTAURANTS_QUERY = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

type Props = {
  search?: string;
  restaurants: any;
};

function RestaurantList({ search, restaurants }: Props) {
  if (restaurants && restaurants.length) {
    const searchQuery = restaurants.filter((r) =>
      r.name.toLowerCase().includes(search)
    );

    if (searchQuery.length != 0) {
      return (
        <Row>
          {searchQuery.map((res) => (
            <Col xs='6' sm='4' key={res.id}>
              <Card style={{ margin: '0 0.5rem 20px 0.5rem' }}>
                <CardImg
                  top={true}
                  style={{ height: 250 }}
                  src={res.image[0].url}
                />
                <CardBody>
                  <CardTitle>{res.name}</CardTitle>
                  <CardText>{res.description}</CardText>
                </CardBody>
                <div className='card-footer'>
                  <Link href={`/restaurants/${res.id}/dishes`}>
                    <a className='btn btn-primary'>View</a>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}

          <style jsx global>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-count: 3;
              }
            `}
          </style>
        </Row>
      );
    } else {
      return <h1>No Restaurants Found</h1>;
    }
  }
  return <h5>Add Restaurants</h5>;
}
export default RestaurantList;
