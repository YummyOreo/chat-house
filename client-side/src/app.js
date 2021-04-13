import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Route } from 'react-router-dom';
import Home from "./Components/Home.js";
import Chat from "./Components/chat/Chat.js";
const App = () => (_jsxs(BrowserRouter, { children: [_jsx(Route, { path: "/", exact: true, component: Home }, void 0),
        _jsx(Route, { path: "/chat", component: Chat }, void 0)] }, void 0));
export default App;
