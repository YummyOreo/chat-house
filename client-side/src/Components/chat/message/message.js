import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../main.css";
const Message = ({ message }) => {
    return (_jsxs("div", Object.assign({ style: { color: "white", backgroundColor: "#83ce73", borderRadius: "10px", marginRight: "min" } }, { children: [_jsx("p", Object.assign({ style: { marginLeft: "10px" } }, { children: message.name }), void 0),
            _jsx("p", Object.assign({ style: { marginLeft: "10px" } }, { children: message.message }), void 0)] }), void 0));
};
export default Message;
