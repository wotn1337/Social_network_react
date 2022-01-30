import {connect} from "react-redux";
import React from "react";
import Header from "./Header";
import {initialStateType, logout} from "../../redux/authReducer";

export type propsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}


class HeaderContainer extends React.Component<propsType> {
    render() {
        return (
            <Header {...this.props} />
        );
    }
}
type stateType = { auth: initialStateType }
const mapStateToProps = (state: stateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect(mapStateToProps, {logout})(HeaderContainer);
