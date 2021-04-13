import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./main.css";
const Home = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    return (_jsxs("div", { children: [_jsx("h1", { children: "Join Room" }, void 0),
            _jsx("div", { children: _jsx("input", { placeholder: "Room", type: 'text', onChange: (event) => {
                        setRoom(event.target.value);
                    } }, void 0) }, void 0),
            _jsx(Link, Object.assign({ onClick: event => (!room) ? event.preventDefault() : null, to: `/chat?room=${room}` }, { children: _jsx("button", Object.assign({ type: "submit" }, { children: "Join" }), void 0) }), void 0)] }, void 0));
};
export default Home;
