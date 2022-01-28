import React from 'react';
import s from './ProfileInfo.module.css';
import StatusHook from "./Status/StatusHook";
import UserLink from "./UserLink";


const Info = ({profile, status, updateStatus, isOwner,}) => {
	const jobMark = profile.lookingForAJob
		? 'https://free-png.ru/wp-content/uploads/2021/06/free-png.ru-39.png'
		: 'https://cs9.pikabu.ru/post_img/big/2020/06/26/6/1593158708124569366.png';

	const userLinks = [];
	for (const contact in profile.contacts) {
		if (profile.contacts[contact]) {
			userLinks.push(<UserLink key={[contact]} name={[contact]} link={profile.contacts[contact]}/>);
		}
	}

	return (
		<div className={s.info}>
			<div className={s.name}>{profile.fullName}</div>
			<StatusHook status={status} updateStatus={updateStatus} isOwner={isOwner}/>
			<div className={s.job}>
				<img className={s.jobMark} src={jobMark} width="20px" height="20px" alt="job mark"/>
				<span>Looking for a job</span>
				<div className={s.jobDesc}>{profile.lookingForAJobDescription}</div>
			</div>
			<div className={s.about}>{profile.aboutMe}</div>
			<div className={s.contacts}>
				{userLinks}
			</div>
		</div>
	);
};

export default Info;