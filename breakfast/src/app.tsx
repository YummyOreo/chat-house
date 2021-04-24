import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
// Gets everything
import Home from "./Components/home/Home";
import Chat from "./Components/chat/Chat";
import MakeRoom from "./Components/make_room/make_room";

const App = () => (
	<BrowserRouter>
		<Route path="/" exact component={Home} /> 
		<Route path="/chat" component={Chat} />
		<Route path="/make" exact component={MakeRoom} />
	</BrowserRouter>
)

export default App;