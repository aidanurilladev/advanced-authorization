import { FC } from 'react';
import scss from './BurgerMenu.module.scss';
import { Link } from 'react-router-dom';
import { IconLogout } from '@tabler/icons-react';
import { Avatar } from 'antd';

interface LinksType {
	name: string;
	href: string;
}

interface BurgerMenuProps {
	siteLinks: LinksType[];
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	pathname: string;
	user: User | null;
	logout: () => void;
}

const BurgerMenu: FC<BurgerMenuProps> = ({
	siteLinks,
	isOpen,
	setIsOpen,
	pathname,
	user,
	logout
}) => {
	return (
		<>
			<div
				className={
					isOpen ? `${scss.BurgerMenu} ${scss.active}` : `${scss.BurgerMenu}`
				}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={scss.content}>
					<div className={scss.user_profile}>
						<Avatar size={40} icon={<img src={user?.photo} alt="avatar" />} />
						<div className={scss.user_data}>
							<p className={scss.user_name}>{user?.userName}</p>
							<p className={scss.user_email}>{user?.email}</p>
						</div>
					</div>
					<nav className={scss.nav}>
						<ul>
							{siteLinks.map((item, index) => (
								<li key={index}>
									<Link
										className={
											pathname === item.href
												? `${scss.link} ${scss.active}`
												: `${scss.link}`
										}
										to={item.href}
										onClick={() => setIsOpen(false)}
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<div className={scss.auth}>
						<button className={scss.logout} onClick={logout}>
							<IconLogout stroke={2} /> Log Out
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
export default BurgerMenu;
