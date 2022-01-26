import React from 'react';
import s from './ProfileInfo.module.css';
import StatusHook from "./Status/StatusHook";


const Info = ({profile, status, updateStatus, isOwner,}) => {
	const jobMark = profile.lookingForAJob
		? 'https://free-png.ru/wp-content/uploads/2021/06/free-png.ru-39.png'
		: 'https://cs9.pikabu.ru/post_img/big/2020/06/26/6/1593158708124569366.png';

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
				<a href={profile.contacts.facebook} target="._blank">
					<img
						width="20px" height="20px"
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
						alt="facebook"/>
				</a>
				<a href={profile.contacts.website} target="._blank">
					<img
						width="20px" height="20px"
						src="https://w7.pngwing.com/pngs/549/715/png-transparent-web-development-logo-website-web-design-symmetry-internet.png"
						alt="facebook"/>
				</a>
				<a href={profile.contacts.vk} target="._blank">
					<img
						width="20px" height="20px"
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/VK.com-logo.svg/2048px-VK.com-logo.svg.png"
						alt="facebook"/>
				</a>
				<a href={profile.contacts.twitter} target="._blank">
					<img
						width="20px" height="20px"
						src="https://upload.wikimedia.org/wikipedia/ru/thumb/9/9f/Twitter_bird_logo_2012.svg/2522px-Twitter_bird_logo_2012.svg.png"
						alt="facebook"/>
				</a>
				<a href={profile.contacts.instagram} target="._blank">
					<img
						width="20px" height="20px"
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png"
						alt="facebook"/>
				</a>
				<a href={profile.contacts.youtube} target="._blank">
					<img
						width="20px" height="20px"
						src="https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png"
						alt="facebook"/>
				</a>
				<a href={profile.contacts.github} target="._blank">
					<img
						width="20px" height="20px"
						src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
						alt="facebook"/>
				</a>
			</div>
		</div>
	);
};

export default Info;