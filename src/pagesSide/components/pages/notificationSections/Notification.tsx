import scss from './Notification.module.scss';

const Notification = () => {
	return (
		<>
			<section className={scss.Notification}>
				<div className={scss.container}>
					<div className={scss.content}>
						<h3>Notification</h3>
					</div>
				</div>
			</section>
		</>
	);
};
export default Notification;
