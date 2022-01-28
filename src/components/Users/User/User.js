import React from "react";
import s from './User.module.css';
import {NavLink} from "react-router-dom";

const User = (props) => {
	const imagePlaceholder = 'https://rlv.zcache.com/avengers_logo_classic_round_sticker-rcf1f4016612145d897ee182a9650cf86_0ugmm_8byvr_704.webp';
	return (
		<div className={s.user}>
			<div className={s.followBlock}>
				<NavLink to={`/profile/${props.id}`}>
					<img className={s.avatar} src={props.avatar ? props.avatar : imagePlaceholder} alt="avatar"/>
				</NavLink>
				<button
					className={s.followButton}
					onClick={props.followed ? props.unfollow : props.follow}
					disabled={props.followingInProgress.some(id => id === props.id)}
				>
					{props.followed ? 'Unfollow' : 'Follow'}
				</button>
			</div>
			<div className={`${s.userInfo} ${!props.followed ? s.unfollow : ''}`}>
				<div className={s.name}>{props.name}</div>
				<div className={s.status}>{props.status}</div>
			</div>
		</div>
	);
};

export default User;