import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { BrowserRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet'
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
		<Helmet>
			<link rel="icon" type="image/png" href="https://camo.githubusercontent.com/44cb495aa5dadf351203d21c25b7ed18634bc5f120c3a953ede727bc6d51d60a/68747470733a2f2f7374617469632e7468656e6f756e70726f6a6563742e636f6d2f706e672f323230363138342d3230302e706e67" sizes="16x16" />
			<meta name="Chat House" content="Chat House, is a app for creators. You can make different types of rooms for different purposes!" />
		</Helmet>
		<BrowserRouter>
			<Route path="/" exact component={Home} /> 
			<Route path="/home" component={Home} /> 
			<Route path="/chat" component={Chat} />
			<Route path="/make" exact component={MakeRoom} />
			<Route path="/login" exact component={Login} />
			<Route path="/callback/login" component={CallbackLogin} />
		</BrowserRouter>
	</ToastProvider>
)

export default App;