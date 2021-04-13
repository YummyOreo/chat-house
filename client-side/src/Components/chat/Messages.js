import { jsx as _jsx } from "react/jsx-runtime";
//import ScrollToBottom from "react-scroll-to-bottom"
import Message from "./message/message.js";
import "../main.css";
import "./noScrollBar.css";
const Messages = ({ messages }) => {
    return (_jsx("div", Object.assign({ className: "message-contaner", style: { "zIndex": 0, overflow: "scroll", height: "20rem", width: "20rem", minWidth: 'max-content', "borderRadius": "10px" } }, { children: Object.keys(messages).map((key, index) => _jsx("div", { children: _jsx(Message, { message: messages[key] }, void 0) }, key)) }), void 0));
};
export default Messages;
