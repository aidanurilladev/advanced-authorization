import { FC, ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ProtectedRouteProps {
	children: ReactNode;
}

export const PrivateRouteProvider: FC<ProtectedRouteProps> = ({ children }) => {
	const [status, setStatus] = useState('pending');
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const checkSession = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/auth/user`,
				{
					headers: {
						Authorization: `Bearer ${JSON.parse(String(localStorage.getItem('token')))}`
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

	// useEffect(() => {
	// 	checkSession();
	// 	handleNavigation();
	// }, [status, pathname, navigate]);

	return children;
};
