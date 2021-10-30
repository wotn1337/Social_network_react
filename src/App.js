import React from "react";
import './App.css';
import {Route} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import Login from "./components/Login/Login";

class App extends React.Component {
	componentDidMount() {
		this.props.initializeApp();
	}

	render() {
		if (!this.props.initialized) {
			return <Preloader />;
		}

		return (
			<div className="app-wrapper">
				<HeaderContainer/>
				<NavbarContainer/>
				<div className="content">
					<Route
						path="/login"
						render={() => <Login/>}
					/>
					<Route
						path="/dialogs"
						render={() => <DialogsContainer/>}
					/>
					<Route
						path="/profile/:userId?"
						render={() => <ProfileContainer/>}
					/>
					<Route
						exact path="/profile/me"
						render={() => <ProfileContainer/>}
					/>
					<Route
						path="/users"
						render={() => <UsersContainer/>}
					/>
					<Route path="/music" render={() => <Music/>}/>
					<Route path="/news" render={() => <News/>}/>
					<Route path="/settings" render={() => <Settings/>}/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App);
