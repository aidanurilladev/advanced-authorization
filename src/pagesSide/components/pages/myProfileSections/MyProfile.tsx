import scss from './MyProfile.module.scss';

const MyProfile = () => {
	return (
		<>
			<section className={scss.MyProfile}>
				<div className={scss.container}>
					<div className={scss.content}>
						<h3>MyProfile</h3>
					</div>
				</div>
			</section>
		</>
	);
};
export default MyProfile;
