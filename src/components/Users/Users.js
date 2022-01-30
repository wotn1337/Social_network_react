import React from "react";
import s from "./Users.module.css";
import User from "./User/User";
import Preloader from "../common/Preloader/Preloader";
import Paginator from "../common/Paginator/Paginator";

const Users = (props) => {
	const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

	const users = props.users.map(user => (
		<User
			key={user.id}
			id={user.id}
			avatar={user.photos.small}
			name={user.name}
			status={user.status}
			followed={user.followed}
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
			{props.isFetching
				? <Preloader/>
				: users
			}
		</div>
	);
};

export default Users;