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
		<div className={s.content}>
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
				isOwner={props.isOwner}
				updateAvatar={props.updateAvatar}
				updateProfile={props.updateProfile}
				setProfile={props.setProfile}
			/>
			<MyPostsContainer/>
		</div>
	);
};

export default Profile;