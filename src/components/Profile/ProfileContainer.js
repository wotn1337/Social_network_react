import {connect} from "react-redux";
import React from "react";
import {getStatus, setUserProfile, updateStatus} from "../../redux/profileReducer";
import Profile from "./Profile";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class ProfileContainer extends React.Component {
	componentDidMount() {
		const id = this.props.match.params.userId || this.props.myId;
		if (!id) {
			this.props.history.push('/login');
		}
		this.props.setUserProfile(id);
		this.props.getStatus(id);
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
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
			<Profile
				{...this.props}
				profile={this.props.profile}
				status={this.props.status}
				updateStatus={this.props.updateStatus}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		profilePage: state.profile,
		profile: state.profile.profile,
		status: state.profile.status,
		myId: state.auth.id,
		isAuth: state.auth.isAuth
	};
};

export default compose(
	connect(mapStateToProps, {
		setUserProfile,
		getStatus,
		updateStatus
	}),
	withRouter
)(ProfileContainer);