import { useQuery, gql } from '@apollo/client';
import Cookies from 'js-cookie';

export const CURRENT_USER_QUERY = gql`
  query {
		me {
			id
			username
			email
		}
  }
`;

type User = {
	id: string
	username: string
	email: string
}

type AuthResponse = {
	me: User | null
}

export const logout = () => {
	Cookies.remove("token");
	window.localStorage.setItem("logout", Date.now().toString());
	window.location.href = '/'
};

export default function useUser() {
	const { data } = useQuery<AuthResponse>(CURRENT_USER_QUERY);
	return data?.me;
}
