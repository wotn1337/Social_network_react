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
import {userType} from "../../types/types";
import Preloader from "../common/Preloader/Preloader";
import {appStateType} from "../../redux/reduxStore";

type mapStateToPropsType = {
    totalUsersCount: number,
    currentPage: number,
    pageSize: number,
    users: Array<userType>
    followingInProgress: Array<number>, // array of user id's
    isFetching: boolean
}

type mapDispatchToPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void,
    changePage: (pageNumber: number, pageSize: number) => void,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
}

type propsType = mapStateToPropsType & mapDispatchToPropsType

class UsersAPIContainer extends React.Component<propsType> {
    componentDidMount() {
        debugger
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    changePage = (pageNumber: number) => {
        this.props.changePage(pageNumber, this.props.pageSize);
    }

    render() {
        if (this.props.isFetching) {
            return <Preloader />;
        }

        return (
            <Users {...this.props} changePage={this.changePage}/>
        );
    }
}

const mapStateToProps = (state: appStateType): mapStateToPropsType=> ({
    users: getStateUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
});

const mapDispatchToProps: mapDispatchToPropsType = {
    getUsers,
    follow,
    unfollow,
    changePage,
};


export default compose(connect(mapStateToProps, mapDispatchToProps))(UsersAPIContainer);