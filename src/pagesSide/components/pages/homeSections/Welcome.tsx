import { FC, useRef } from 'react';
import scss from './Welcome.module.scss';

const Welcome: FC = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const focusInput = () => {
		if (inputRef.current) {
			const data = inputRef.current.value;
			console.log(data);
		}
	};

	return (
		<section className={scss.Welcome}>
			<div className={scss.container}>
				<div className={scss.content}>
					<h1>Welcome Developer!</h1>
					<div>
						<input ref={inputRef} type="text" />
						<button onClick={focusInput}>Focus the input</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Welcome;
