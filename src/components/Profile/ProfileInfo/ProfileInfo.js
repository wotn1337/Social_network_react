import s from "./ProfileInfo.module.css";
import React, {useState} from "react";
import Info from "./Info";
import EditingProfile from "./EditingProfile";

const ProfileInfo = ({profile, status, updateStatus, isOwner, updateAvatar, updateProfile}) => {
	const [editMode, setEditMode] = useState(false);
	const avatarPlaceHolder = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

	return (
		<div className={s.profile_info}>
			<div className={s.avatarBlock}>
				<img
					className={s.avatar}
					src={profile.photos.large ? profile.photos.large : avatarPlaceHolder}
					alt="Avatar"
					height="150px"
				/>
				<input id='avatar' type="file" style={{display: 'none'}} accept='image/*'
				       onChange={e => updateAvatar(e.target.files[0])}/>
				{isOwner && <label htmlFor="avatar" className={s.uploadAvatarButton}/>}
			</div>
			<button className={s.editButton} onClick={() => setEditMode(true)}>Edit profile</button>
			{!editMode
				? <Info
					profile={profile}
					status={status}
					updateStatus={updateStatus}
					isOwner={isOwner}
				/>
				: <EditingProfile profile={profile} handleSubmit={updateProfile}/>
			}

		</div>
	);
};

export default ProfileInfo;