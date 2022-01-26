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
					? <div className={s.profileInfo}>{props.login} | <button onClick={props.logout} className={s.logoutButton}>
						Logout
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Ic_arrow_back_36px.svg/240px-Ic_arrow_back_36px.svg.png"
							alt="logout"
							className={s.logoutArrow}
						/>
					</button></div> :
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


