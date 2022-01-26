import {connect} from "react-redux";
import React from "react";
import {getStatus, setUserProfile, updateAvatar, updateProfile, updateStatus} from "../../redux/profileReducer";
import Profile from "./Profile";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class ProfileContainer extends React.Component {
	state = {
		isOwner: !this.props.match.params.userId
	}

	componentDidMount() {
		this.setProfile();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.match.params.userId !== prevProps.match.params.userId) {
			this.setState({isOwner: !this.props.match.params.userId});
		}
		this.setProfile();
	}

	setProfile = () => {
		const id = this.props.match.params.userId || this.props.myId;
		if (!id) {
			this.props.history.push('/login');
		} else {
			this.props.setUserProfile(id);
			this.props.getStatus(id);
		}
	}

	render() {
		return (
			<Profile {...this.props} {...this.state}/>
		);
	}
}

const mapStateToProps = (state) => ({
	profilePage: state.profile,
	profile: state.profile.profile,
	status: state.profile.status,
	myId: state.auth.id,
	isAuth: state.auth.isAuth
});

export default compose(
	connect(mapStateToProps, {
		setUserProfile,
		getStatus,
		updateStatus,
		updateAvatar,
		updateProfile
	}),
	withRouter
)(ProfileContainer);