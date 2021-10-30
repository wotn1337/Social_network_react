import React from "react";
import s from './Friends.module.css';
import Friend from "./Friend/Friend";

const Friends = (props) => {
	const friendsComps = props.friends.map(friend => <Friend avatar={friend.avatar} name={friend.name} key={friend.id}/>);

	return (
		<div className={s.friends}>
			<p className={s.title}>Friends</p>
			<div className={s.friends_block}>
				{friendsComps}
			</div>
		</div>
	);
};

export default Friends;