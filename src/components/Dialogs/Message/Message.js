import React from "react";
import s from "./Message.module.css";

const Message = (props) => {
	return (
		<div className={`${s.message} ${props.isMine ? s.my_message : ''}`}>{props.message}</div>
	);
};

export default Message;