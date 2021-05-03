import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { BrowserRouter, Route } from 'react-router-dom';
// Gets everything
import Home from "./Components/home/Home";
import Chat from "./Components/chat/Chat";
import MakeRoom from "./Components/make_room/make_room";
import Login from "./Components/login/login";
import CallbackLogin from "./Components/CallbackLogin/CallbackLogin";

const App = () => (
	<ToastProvider
	autoDismiss
	autoDismissTimeout={10000}
	placement="bottom-right"
	>
		<BrowserRouter>
			<Route path="/" exact component={Home} /> 
			<Route path="/chat" component={Chat} />
			<Route path="/make" exact component={MakeRoom} />
			<Route path="/login" exact component={Login} />
			<Route path="/callback/login" component={CallbackLogin} />
		</BrowserRouter>
	</ToastProvider>
)

export default App;