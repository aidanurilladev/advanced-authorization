import { FC } from 'react';
import scss from './Header.module.scss';
import { useLocation } from 'react-router-dom';
import Search from 'antd/es/input/Search';
import { SearchProps } from 'antd/lib/input';
import { menuLinks, siteLinks } from '@/src/routes/links.tsx';
import ProfileButton from '@/src/ui/profileButton/ProfileButton.tsx';
import ProfileMenu from '@/src/ui/profileMenu/ProfileMenu.tsx';
import BurgerButton from '@/src/ui/burgerButton/BurgerButton.tsx';
import BurgerMenu from '@/src/ui/burgerMenu/BurgerMenu.tsx';
import logo from '@/src/assets/logo.png';

interface HeaderProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	isMobile: boolean;
	user: User;
}

const Header: FC<HeaderProps> = ({ isOpen, setIsOpen, isMobile, user }) => {
	const { pathname } = useLocation();

	const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
		console.log(info?.source, value);

	const logout = () => {
		localStorage.removeItem('accessToken');
		sessionStorage.removeItem('accessToken');
		window.location.reload();
	};

	return (
		<>
			<header className={scss.Header}>
				<div className="container">
					<div className={scss.content}>
						<button className={scss.logo}>
							<img src={logo} alt="logo" />
						</button>
						<Search
							placeholder="input search text"
							allowClear
							onSearch={onSearch}
							className={scss.search}
						/>
						{!isMobile ? (
							<>
								<ProfileButton
									isOpen={isOpen}
									setIsOpen={setIsOpen}
									user={user}
								/>
								<ProfileMenu
									menuLinks={menuLinks}
									isOpen={isOpen}
									setIsOpen={setIsOpen}
									pathname={pathname}
									user={user}
									logout={logout}
								/>
							</>
						) : (
							<>
								<BurgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
								<BurgerMenu
									siteLinks={siteLinks}
									isOpen={isOpen}
									setIsOpen={setIsOpen}
									pathname={pathname}
									user={user}
									logout={logout}
								/>
							</>
						)}
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
