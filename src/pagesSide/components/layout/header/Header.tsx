import scss from './Header.module.scss';
import logo from '../../../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Header = () => {
	const [session, setSession] = useState(false);
	const navigate = useNavigate();

	const checkSession = async () => {
		try {
			await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/user`, {
				headers: {
					Authorization: `Bearer ${JSON.parse(String(localStorage.getItem('token')))}`
				}
			});
			setSession(true);
		} catch (error) {
			setSession(false);
		}
	};

	const logout = () => {
		localStorage.removeItem('token');
		navigate('/auth/login');
	};

	useEffect(() => {
		checkSession();
	}, []);

	return (
		<header className={scss.Header}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.logo}>
						<img src={logo} alt="logo" />
					</div>
					<div className={scss.auth}>
						{session ? (
							<>
								<button className={scss.logout} onClick={logout}>
									Logout
								</button>
							</>
						) : (
							<>
								<Link to="/auth/login" className={scss.sign_in}>
									Sign in
								</Link>
								<Link to="/auth/registration" className={scss.sign_up}>
									Sign up
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
