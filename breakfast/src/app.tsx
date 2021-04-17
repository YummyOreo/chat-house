import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
// Gets everything
import Home from "./Components/home/Home";
import Chat from "./Components/chat/Chat";

const App = () => (
	<BrowserRouter>
		<Route path="/" exact component={Home} /> 
		<Route path="/chat" component={Chat} />
	</BrowserRouter>
)

export default App;