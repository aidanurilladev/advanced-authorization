import scss from './ResetPasswordPage.module.scss';
import { useSearchParams } from 'react-router-dom';

const ResetPasswordPage = () => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	console.log(token);

	return (
		<>
			<section className={scss.ResetPasswordPage}>
				<div className={scss.container}>
					<div className={scss.content}></div>
				</div>
			</section>
		</>
	);
};
export default ResetPasswordPage;
