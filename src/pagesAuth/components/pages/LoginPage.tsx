import { useState } from 'react';
import scss from './LoginPage.module.scss';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { usePostLoginMutation } from '@/src/redux/api/auth';
import logo from '@/src/assets/logo.png';
import { Button, Checkbox, Input } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Link } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IFormInput {
    email: string;
    password: string;
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

const LoginForm = ({
    handleSubmit,
    control,
    errors,
    handleRememberMeChange,
    onSubmit
}: any) => (
    <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
            name="email"
            control={control}
            rules={{ required: true, minLength: 2, pattern: /^\S+@\S+\.\S+$/i }}
            placeholder="Email"
            errors={errors}
        />
        <PasswordField
            name="password"
            control={control}
            rules={{ required: true, minLength: 2 }}
            placeholder="Пароль"
            errors={errors}
        />
        <Checkbox className={scss.customCheckbox} onChange={handleRememberMeChange}>
            Сохранить вход
        </Checkbox>
        <Button type="primary" size="large" block htmlType="submit">
            Войти
        </Button>
    </form>
);

const LoginPage = () => {
    const [postLoginMutation] = usePostLoginMutation();
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInput>();
    const [rememberMe, setRememberMe] = useState(false);

    const handleRememberMeChange = (e: CheckboxChangeEvent) => {
        setRememberMe(e.target.checked);
    };

    const onSubmit: SubmitHandler<IFormInput> = async (userData) => {
        try {
            const response = await postLoginMutation(userData);
            if (response.data?.accessToken) {
                const storage = rememberMe ? localStorage : sessionStorage;
                storage.setItem(
                    'accessToken',
                    JSON.stringify(response.data.accessToken)
                );
                toast.success('Успешно', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 5000); 
            }else{
				toast.error('Ошибка при входе!', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					transition: Bounce,
				});
			}
        } 
		 catch (e) {
            
            console.error('An error occurred:', e);
        }
    };

    return (
        <section className={scss.LoginPage}>
            <div className="container">
                <div className={scss.content}>
                    <img className={scss.logo} src={logo} alt="logo" />
                    <LoginForm
                        handleSubmit={handleSubmit}
                        control={control}
                        errors={errors}
                        handleRememberMeChange={handleRememberMeChange}
                        onSubmit={onSubmit}
                    />
                    <div className={scss.links}>
                        <Link to="/auth/registration" className={scss.link}>
                            У вас нет аккаунта?
                        </Link>
                        <Link to="/auth/forgot" className={scss.link}>
                            Забыли пароль?
                        </Link>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
};

export default LoginPage;
