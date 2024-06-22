import scss from './ForgotPage.module.scss';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { usePostForgotPasswordMutation } from '@/src/redux/api/auth';
import { Button, Input } from 'antd';
import logo from '@/src/assets/logo.png';

interface IFormInput {
	email: string;
	frontEndUrl: string;
}

const InputField = ({ name, control, rules, placeholder, errors }: any) => (
	<Controller
		name={name}
		control={control}
		rules={rules}
		render={({ field }) => (
			<Input
				status={errors[name] ? 'error' : ''}
				className={scss.input}
				size="large"
				placeholder={placeholder}
				{...field}
			/>
		)}
	/>
);

const ForgotForm = ({ handleSubmit, control, errors, onSubmit }: any) => (
	<form onSubmit={handleSubmit(onSubmit)}>
		<InputField
			name="email"
			control={control}
			rules={{ required: true, pattern: /^\S+@\S+\.\S+$/i }}
			placeholder="Email для восстановления"
			errors={errors}
		/>
		<Button type="primary" size="large" block htmlType="submit">
			Отправить
		</Button>
	</form>
);

const ForgotPage = () => {
	const [postForgotPasswordMutation] = usePostForgotPasswordMutation();
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IFormInput>();

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		try {
			const forgotData = {
				email: data.email,
				frontEndUrl: window.location.href
			};
			const response = await postForgotPasswordMutation(forgotData);
			if (response.data?.message) {
				alert(response.data.message);
				reset();
			}
		} catch (e) {
			console.error('An error occurred:', e);
		}
	};

	return (
		<section className={scss.ForgotPage}>
			<div className="container">
				<div className={scss.content}>
					<img className={scss.logo} src={logo} alt="logo" />
					<ForgotForm
						handleSubmit={handleSubmit}
						control={control}
						errors={errors}
						onSubmit={onSubmit}
					/>
				</div>
			</div>
		</section>
	);
};

export default ForgotPage;
