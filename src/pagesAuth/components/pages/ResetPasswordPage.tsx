import scss from './ResetPasswordPage.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Input } from 'antd';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { usePatchResetPasswordMutation } from '@/src/redux/api/auth';
import logo from '@/src/assets/logo.png';

interface IFormInput {
	newPassword: string;
	confirmPassword: string;
}

const PasswordField = ({ name, control, rules, placeholder, errors }: any) => (
	<Controller
		name={name}
		control={control}
		rules={rules}
		render={({ field }) => (
			<Input.Password
				status={errors[name] ? 'error' : ''}
				className={scss.input}
				size="large"
				placeholder={placeholder}
				{...field}
			/>
		)}
	/>
);

const ResetPasswordForm = ({
	handleSubmit,
	control,
	errors,
	password,
	onSubmit
}: any) => (
	<form onSubmit={handleSubmit(onSubmit)}>
		<PasswordField
			name="newPassword"
			control={control}
			rules={{ required: true, minLength: 6 }}
			placeholder="Новый пароль"
			errors={errors}
		/>
		<PasswordField
			name="confirmPassword"
			control={control}
			rules={{
				required: true,
				minLength: 6,
				validate: (value: string) => value === password || 'Пароли не совпадают'
			}}
			placeholder="Повторите новый пароль"
			errors={errors}
		/>
		<Button type="primary" size="large" block htmlType="submit">
			Сбросить пароль
		</Button>
	</form>
);

const ResetPasswordPage = () => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	const navigate = useNavigate();
	const [patchResetPasswordMutation] = usePatchResetPasswordMutation();
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<IFormInput>();

	const onSubmit: SubmitHandler<IFormInput> = async (userData) => {
		if (!token) {
			alert('Токен не найден');
			return;
		}

		try {
			const response = await patchResetPasswordMutation({
				token,
				newPassword: userData.newPassword
			});
			if (response.data?.message) {
				alert(response.data.message);
				navigate('/auth/login');
			}
		} catch (e) {
			console.error('An error occurred:', e);
		}
	};

	const password = watch('newPassword');

	return (
		<section className={scss.ResetPasswordPage}>
			<div className="container">
				<div className={scss.content}>
					<img className={scss.logo} src={logo} alt="logo" />
					<ResetPasswordForm
						handleSubmit={handleSubmit}
						control={control}
						errors={errors}
						password={password}
						onSubmit={onSubmit}
					/>
				</div>
			</div>
		</section>
	);
};

export default ResetPasswordPage;
