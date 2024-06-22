import scss from './Chats.module.scss';
import { useRef, useState } from 'react';
import { Button, Input } from 'antd';

interface Message {
	event: string;
	username: string;
	message?: string;
}

const Chats = () => {
	const socket = useRef<WebSocket | null>(null);
	const [connected, setConnected] = useState(false);
	const [username, setUsername] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<Message[]>([]);

	const connect = () => {
		socket.current = new WebSocket(import.meta.env.VITE_PUBLIC_API_WSS);
		socket.current.onopen = () => {
			console.log('Подключился WebSocket ✅');
			setConnected(true);
			const message = {
				event: 'connection',
				username
			};
			socket.current?.send(JSON.stringify(message));
		};
		socket.current.onmessage = (event) => {
			console.log('Сообщение было отправлено');
			const message: Message = JSON.parse(event.data);

			setMessages((prev) => [message, ...prev]);
		};
		socket.current.onclose = () => {
			console.log('WebSocket closed');
			setConnected(false);
		};
		socket.current.onerror = () => {
			console.log('WebSocket error');
			setConnected(false);
		};
	};

	const logout = () => {
		socket.current?.close();
	};

	const sendMessage = () => {
		const messageData = {
			event: 'message',
			username,
			message
		};
		socket.current?.send(JSON.stringify(messageData));
		setMessage('');
	};

	return (
		<section className={scss.Chats}>
			<div className={scss.container}>
				<div className={scss.content}>
					{!connected ? (
						<>
							<div className={scss.auth}>
								<Input
									style={{
										width: '300px'
									}}
									placeholder="Your login username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
								<Button type="primary" onClick={connect}>
									Login
								</Button>
							</div>
						</>
					) : (
						<>
							<h1>Welcome {username} Developer 😈!</h1>
							<div className={scss.send_message}>
								<Input
									style={{
										width: '300px'
									}}
									placeholder="Your message"
									value={message}
									onChange={(e) => setMessage(e.target.value)}
								/>
								<Button type="primary" onClick={sendMessage}>
									Send
								</Button>
								<Button type="primary" onClick={logout}>
									Logout
								</Button>
							</div>
							<div className={scss.messages}>
								{messages.map((msg, index) => (
									<div
										key={index}
										className={`${scss.message} ${
											msg.username === username ? scss.self : scss.other
										}`}
									>
										{msg.event === 'connection' ? (
											<div className={scss.user_name}>
												💜 Пользователь <span>{msg.username}</span> подключился
											</div>
										) : (
											<div className={scss.user_message}>
												<strong>{msg.username}:</strong> {msg.message}
											</div>
										)}
									</div>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default Chats;
