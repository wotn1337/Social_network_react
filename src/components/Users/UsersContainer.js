import {connect} from "react-redux";
import {getUsers, follow, unfollow, changePage} from "../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import {compose} from "redux";
import {
	getCurrentPage, getFollowingInProgress,
	getIsFetching,
	getPageSize,
	getStateUsers,
	getTotalUsersCount
} from "../../redux/usersSelectors";


class UsersAPIContainer extends React.Component {
	componentDidMount() {
		this.props.getUsers(this.props.currentPage, this.props.pageSize);
	}

	changePage = (pageNumber) => {
		this.props.changePage(pageNumber, this.props.pageSize);
	}

	follow = (id) => {
		this.props.follow(id);
	}

	unfollow = (id) => {
		this.props.unfollow(id);
	}

	render() {
		return (
			<Users
				totalUsersCount={this.props.totalUsersCount}
				pageSize={this.props.pageSize}
				currentPage={this.props.currentPage}
				changePage={this.changePage}
				users={this.props.users}
				follow={this.follow}
				unfollow={this.unfollow}
				isFetching={this.props.isFetching}
				followingInProgress={this.props.followingInProgress}
			/>
		);
	}
}

// const mapStateToProps = (state) => {
// 	return {
// 		users: state.users.users,
// 		pageSize: state.users.pageSize,
// 		totalUsersCount: state.users.totalUsersCount,
// 		currentPage: state.users.currentPage,
// 		isFetching: state.users.isFetching,
// 		followingInProgress: state.users.followingInProgress
// 	}
// };

const mapStateToProps = (state) => {
	return {
		users: getStateUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state)
	}
};


export default compose(
	connect(mapStateToProps, {
		getUsers,
		follow,
		unfollow,
		changePage
	}),
)(UsersAPIContainer);