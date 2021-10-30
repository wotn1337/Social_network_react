import s from "./DialogItem.module.css";
import {NavLink} from "react-router-dom";
import React from "react";

const DialogItem = (props) => {
	return (
		<div className={s.item}>
			<NavLink to={"/dialogs/" + props.id} activeClassName={s.active}>
				<div className={s.dialog}>
					<img src={props.avatar} alt="" className={s.avatar}/>
					{props.name}
				</div>
			</NavLink>
		</div>
	);
};

export default DialogItem;