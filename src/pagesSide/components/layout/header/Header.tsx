import scss from './Header.module.scss';
import logo from '../../../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useGetMeQuery } from '../../../../redux/api/me';

const Header = () => {
	const { data } = useGetMeQuery();
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('token');
		navigate('/auth/login');
	};

	return (
		<header className={scss.Header}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.logo}>
						<img src={logo} alt="logo" />
					</div>
					<div className={scss.auth}>
						{data?.profile ? (
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
