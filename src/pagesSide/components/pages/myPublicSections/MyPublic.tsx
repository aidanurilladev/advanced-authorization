import scss from './MyPublic.module.scss';

const MyPublic = () => {
	return (
		<>
			<section className={scss.MyPublic}>
				<div className={scss.container}>
					<div className={scss.content}>
						<h3>MyPublic</h3>
					</div>
				</div>
			</section>
		</>
	);
};
export default MyPublic;
