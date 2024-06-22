import { FC } from 'react';
import scss from './SideBar.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { siteLinks } from '@/src/routes/links.tsx';

const SideBar: FC = () => {
	const { pathname } = useLocation();
	return (
		<>
			<div className={scss.SideBar}>
				<nav className={scss.nav}>
					<ul>
						{siteLinks.map((item, index) => (
							<li key={index}>
								<Link className={scss.link} to={item.href}>
									{item.icon} {item.name}
									{pathname === item.href && (
										<motion.div
											layoutId="active-pill"
											className={scss.active}
											transition={{ type: 'spring', duration: 0.6 }}
										/>
									)}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</>
	);
};
export default SideBar;
