import { useState } from 'react';
import scss from './RegistrationPage.module.scss';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { usePostRegistrationMutation } from '@/src/redux/api/auth';
import { Button, Checkbox, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import logo from '@/src/assets/logo.png';

interface IFormInput {
	lastName: string;
	firstName: string;
	userName: string;
	email: string;
	password: string;
	confirmPassword: string;
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

const RegistrationForm = ({
	handleSubmit,
	control,
	errors,
	password,
	handleRememberMeChange,
	onSubmit
}: any) => (
	<form onSubmit={handleSubmit(onSubmit)}>
		<InputField
			name="lastName"
			control={control}
			rules={{ required: true, minLength: 2 }}
			placeholder="Фамилия"
			errors={errors}
		/>
		<InputField
			name="firstName"
			control={control}
			rules={{ required: true, minLength: 2 }}
			placeholder="Имя"
			errors={errors}
		/>
		<InputField
			name="userName"
			control={control}
			rules={{ required: true, minLength: 2 }}
			placeholder="Имя пользователя"
			errors={errors}
		/>
		<InputField
			name="email"
			control={control}
			rules={{ required: true, minLength: 2, pattern: /^\S+@\S+\.\S+$/i }}
			placeholder="Номер телефона или email"
			errors={errors}
		/>
		<PasswordField
			name="password"
			control={control}
			rules={{ required: true, minLength: 2 }}
			placeholder="Пароль"
			errors={errors}
		/>
		<PasswordField
			name="confirmPassword"
			control={control}
			rules={{
				required: true,
				minLength: 2,
				validate: (value: string) => value === password || 'Пароли не совпадают'
			}}
			placeholder="Повторите пароль"
			errors={errors}
		/>
		<Checkbox className={scss.customCheckbox} onChange={handleRememberMeChange}>
			Сохранить вход
		</Checkbox>
		<Button type="primary" size="large" block htmlType="submit">
			Зарегистрироваться
		</Button>
	</form>
);

const RegistrationPage = () => {
	const [postRegisterMutation] = usePostRegistrationMutation();
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<IFormInput>();
	const [rememberMe, setRememberMe] = useState(false);

	const handleRememberMeChange = (e: CheckboxChangeEvent) => {
		setRememberMe(e.target.checked);
	};

	const onSubmit: SubmitHandler<IFormInput> = async (userData) => {
		const userDataRest = {
			lastName: userData.lastName,
			firstName: userData.firstName,
			userName: userData.userName,
			email: userData.email,
			password: userData.password
		};

		try {
			const response = await postRegisterMutation(userDataRest);
			if (response.data?.message) {
				const storage = rememberMe ? localStorage : sessionStorage;
				storage.setItem('accessToken', JSON.stringify(response.data.message));
				window.location.reload();
			}
		} catch (e) {
			console.error('An error occurred:', e);
		}
	};

	const password = watch('password');

	return (
		<section className={scss.RegistrationPage}>
			<div className={scss.container}>
				<div className={scss.content}>
					<img className={scss.logo} src={logo} alt="logo" />
					<RegistrationForm
						handleSubmit={handleSubmit}
						control={control}
						errors={errors}
						password={password}
						handleRememberMeChange={handleRememberMeChange}
						onSubmit={onSubmit}
					/>
				</div>
			</div>
		</section>
	);
};

export default RegistrationPage;
