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
				if (status === 'fulfilled') {
					navigate('/');
				}
				break;
			case '/':
				if (status === 'rejected') {
					navigate('/auth/login');
				}
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		console.log(window.location.href);
		handleNavigation();
	}, [status, pathname, navigate]);

	return children;
};
