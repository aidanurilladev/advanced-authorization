import { FC, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetMeQuery } from '../redux/api/auth';

interface SessionProviderProps {
	children: ReactNode;
}

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
	const { status } = useGetMeQuery();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const handleNavigation = () => {
		switch (pathname) {
			case '/auth/login':
			case '/auth/registration':
			case '/auth/reset-password':
			case '/auth/forgot':
				if (status === 'fulfilled') {
					navigate('/');
				}
				break;
			case '/':
			case '/chats':
			case '/notifications':
			case '/settings':
			case '/my-profile':
			case '/my-public':
				if (status === 'rejected') {
					navigate('/auth/login');
				}
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		handleNavigation();
	}, [status, pathname, navigate]);

	return children;
};
