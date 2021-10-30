import React from "react";
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../common/Preloader/Preloader";

const Profile = (props) => {
	if (!props.profile) {
		return <Preloader />;
	}

	return (
		<div>
			<div>
				<img
					className={s.main_image}
					src={props.profilePage.mainImage}
					alt="Main"
					height="300px"
				/>
			</div>
			<ProfileInfo
				profile={props.profile}
				status={props.status}
				updateStatus={props.updateStatus}
			/>
			<MyPostsContainer/>
		</div>
	);
};

export default Profile;