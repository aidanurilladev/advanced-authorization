import scss from './Header.module.scss';
import logo from '../../../../assets/logo.svg';

const Header = () => {
	return (
		<header className={scss.Header}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.logo}>
						<img src={logo} alt="logo" />
					</div>
					<div className={scss.auth}>
						<button className={scss.sign_in}>Sign in</button>
						<button className={scss.sign_up}>Sign up</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
