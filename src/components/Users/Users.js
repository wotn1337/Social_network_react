import React from "react";
import s from "./Users.module.css";
import User from "./User/User";
import Preloader from "../common/Preloader/Preloader";

const Users = (props) => {
	const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
	const pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(<div
			className={`${s.button} ${props.currentPage === i ? s.selected : ''}`}
			onClick={() => props.changePage(i)}
			key={i}
		>{i}</div>);
	}
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
			<div className={s.pagination}>
				{pages}
			</div>
			{props.isFetching && <Preloader/>}
			{users}
		</div>
	);
};

export default Users;