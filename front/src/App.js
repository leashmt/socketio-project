import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import List from './components/List';
import Connexion from './components/Connexion';
import Admin from './components/Admin';

const socket = io('http://localhost:3001');

function App() {
	useEffect(() => {
		socket.on('connect', () => {
			console.log('Connected to server');
		});

		socket.on('disconnect', () => {
			console.log('Disconnected from server');
		});

		return () => {
			socket.off('connect');
			socket.off('disconnect');
			socket.off('message');
		};
	}, []);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/:listName/:username" element={<List />} />
				<Route path="/:listName" element={<Connexion />} />
				<Route path="/admin/:listName/:username" element={<Admin />} />
			</Routes>
		</Router>
	);
}

export default App;
