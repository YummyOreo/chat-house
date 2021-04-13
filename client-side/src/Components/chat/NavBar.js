import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../main.css";
const NavBar = ({ roomName }) => {
    const sticky = {
        position: "fixed",
        height: "3rem"
    };
    const stickyInner = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
    };
    return (_jsx("div", Object.assign({ style: sticky }, { children: _jsx("nav", Object.assign({ style: stickyInner }, { children: _jsxs("div", Object.assign({ className: 'nav-wrapper' }, { children: [_jsx("a", Object.assign({ href: "/", className: "waves-effect waves-light btn" }, { children: "Back" }), void 0),
                    _jsx("a", Object.assign({ className: "brand-logo center" }, { children: roomName }), void 0)] }), void 0) }), void 0) }), void 0));
};
export default NavBar;
