import React from "react";
import s from './User.module.css';
import {NavLink} from "react-router-dom";
import {userType} from "../../../types/types";

type propsType = {
	user: userType,
	follow: () => void,
	unfollow: () => void,
	followingInProgress: Array<number>
}

const User: React.FC<propsType> = ({user, follow, unfollow, followingInProgress}) => {
	const imagePlaceholder = 'https://rlv.zcache.com/avengers_logo_classic_round_sticker-rcf1f4016612145d897ee182a9650cf86_0ugmm_8byvr_704.webp';
	return (
		<div className={s.user}>
			<div className={s.followBlock}>
				<NavLink to={`/profile/${user.id}`}>
					<img className={s.avatar} src={user.photos.small ? user.photos.small : imagePlaceholder} alt="avatar"/>
				</NavLink>
				<button
					className={s.followButton}
					onClick={user.followed ? unfollow : follow}
					disabled={followingInProgress.some(id => id === user.id)}
				>
					{user.followed ? 'Unfollow' : 'Follow'}
				</button>
			</div>
			<div className={`${s.userInfo} ${!user.followed ? s.unfollow : ''}`}>
				<div className={s.name}>{user.name}</div>
				<div className={s.status}>{user.status}</div>
			</div>
		</div>
	);
};

export default User;