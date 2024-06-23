import scss from './Chats.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Button, Input, Avatar } from 'antd';
import { useGetMeQuery } from '@/src/redux/api/auth';

interface Message {
	event: string;
	username: string;
	avatar?: string;
	message?: string;
}

const Chats = () => {
	const { data: user } = useGetMeQuery();
	const socket = useRef<WebSocket | null>(null);
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<Message[]>([]);

	const connect = () => {
		socket.current = new WebSocket(
			import.meta.env.VITE_PUBLIC_API_WSS as string
		);
		socket.current.onopen = () => {
			console.log('WebSocket подключен ✅');
			const connectionMessage: Message = {
				event: 'connection',
				username: user?.profile.userName ?? '',
				avatar: user?.profile.photo ?? ''
			};
			socket.current?.send(JSON.stringify(connectionMessage));
		};
		socket.current.onmessage = (event) => {
			console.log('Сообщение получено');
			const receivedMessage: Message = JSON.parse(event.data);
			setMessages((prev) => [receivedMessage, ...prev]);
		};
		socket.current.onclose = () => {
			console.log('WebSocket закрыт');
		};
		socket.current.onerror = () => {
			console.log('WebSocket ошибка');
		};
	};

	useEffect(() => {
		connect();
		return () => {
			socket.current?.close();
		};
	}, []);

	const sendMessage = () => {
		if (message.trim()) {
			const messageData: Message = {
				event: 'message',
				username: user?.profile.userName ?? '',
				avatar: user?.profile.photo ?? '',
				message
			};
			socket.current?.send(JSON.stringify(messageData));
			setMessage('');
		}
	};

	return (
		<section className={scss.Chats}>
			<div className={scss.container}>
				<div className={scss.content}>
					<h1>Welcome {user?.profile.userName} Developer 😈!</h1>
					<div className={scss.send_message}>
						<Input
							style={{ width: '300px' }}
							placeholder="Your message"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
						<Button type="primary" onClick={sendMessage}>
							Send
						</Button>
					</div>
					<div className={scss.messages}>
						{messages.map((msg, index) => (
							<div
								key={index}
								className={`${scss.message} ${
									msg.username === user?.profile.userName
										? scss.self
										: scss.other
								}`}
							>
								{msg.event === 'connection' ? (
									<div className={scss.user_name}>
										<Avatar size={38} src={msg.avatar} /> Пользователь{' '}
										<span>{msg.username}</span> подключился
									</div>
								) : (
									<div className={scss.user_message}>
										<Avatar size={38} src={msg.avatar} />{' '}
										<strong>{msg.username}:</strong> {msg.message}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Chats;
