import React from "react";
import s from "./Users.module.css";
import User from "./User/User";
import Paginator from "../common/Paginator/Paginator";
import {userType} from "../../types/types";

type propsType = {
	totalUsersCount: number,
	pageSize: number,
	users: Array<userType>,
	currentPage: number,
	changePage: (page: number) => void,
	follow: (userId: number) => void,
	unfollow: (userId: number) => void,
	followingInProgress: Array<number>, // array of user id's
}

const Users: React.FC<propsType> = (props) => {
	const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

	const users = props.users.map(user => (
		<User
			key={user.id}
			user={user}
			follow={() => props.follow(user.id)}
			unfollow={() => props.unfollow(user.id)}
			followingInProgress={props.followingInProgress}
		/>
	));

	return (
		<div className={s.users}>
			<Paginator
				currentPage={props.currentPage}
				totalPagesCount={pagesCount}
				changePage={props.changePage}
			/>
			{users}
			<Paginator
				currentPage={props.currentPage}
				totalPagesCount={pagesCount}
				changePage={props.changePage}
			/>
		</div>
	);
};

export default Users;