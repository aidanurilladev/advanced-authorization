import { FC, ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ProtectedRouteProps {
	children: ReactNode;
}

const token = 'your_token_here';

export const PrivateRouteProvider: FC<ProtectedRouteProps> = ({ children }) => {
	const [status, setStatus] = useState('pending');
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const checkSession = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/auth/sign-in`,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);
			if (response.status === 200) {
				setStatus('fulfilled');
			} else {
				setStatus('rejected');
			}
		} catch (error) {
			setStatus('rejected');
		}
	};

	const handleNavigation = () => {
		switch (pathname) {
			case '/login':
				if (status === 'fulfilled') {
					navigate('/dashboard');
				}
				break;
			case '/dashboard':
			case '/statistics':
			case '/rating':
				if (status === 'rejected') {
					navigate('/login');
				}
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		checkSession();
		handleNavigation();
	}, [status, pathname, navigate]);

	return children;
};
