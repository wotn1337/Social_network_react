import React from "react";
import s from './Friend.module.css';

const Friend = ({avatar, name}) => {
	return (
		<div className={s.friend}>
			<img className={s.avatar} src={avatar} alt=""/>
			<span className={s.name}>{name}</span>
		</div>
	);
};

export default Friend;