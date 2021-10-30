import React from "react";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
	return (
		<header className={s.header}>
			<img
				src="https://i.etsystatic.com/13616829/r/il/ece1e0/2107962885/il_fullxfull.2107962885_gp27.jpg"
				alt="Logo"
				height="100%"
				className={s.logo}
			/>

			<div className={s.loginBlock}>
				{props.isAuth
					? <div>{props.login} | <button onClick={props.logout}>Logout</button></div> :
					<NavLink to="/login">
						<img
							src="https://aux.iconspalace.com/uploads/login-icon-256.png"
							alt="login"
							height="50px"
						/>
					</NavLink>
				}
			</div>
		</header>
	);
};

export default Header;


