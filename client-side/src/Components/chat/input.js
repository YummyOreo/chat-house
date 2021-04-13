import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../main.css";
const Input = ({ message, setMessage, sendMessage }) => (_jsx("div", { children: _jsxs("form", { children: [_jsx("input", { style: { color: "white" }, type: "text", placeholder: "Message", onChange: (event) => setMessage(event.target.value), onKeyPress: event => event.key === "Enter" ? sendMessage(event) : null }, void 0),
            _jsx("button", Object.assign({ className: "waves-effect waves-light btn", onClick: (event) => {
                    if (event == '')
                        return;
                    sendMessage(event);
                } }, { children: "Send" }), void 0)] }, void 0) }, void 0));
export default Input;
