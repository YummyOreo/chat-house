import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Home from "./Components/Home.js"
import Chat from "./Components/chat/Chat.js"

const App = () => (
	<BrowserRouter>
		<Route path="/" exact component={Home} />
		<Route path="/chat" component={Chat} />
	</BrowserRouter>
)

export default App;