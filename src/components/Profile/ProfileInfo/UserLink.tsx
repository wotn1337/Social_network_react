import React from 'react';

type propsType = {
	link: string,
	name: string
}

interface imagesInterface {
	[index: string]: string;
}

const images: imagesInterface = {
	facebook: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png',
	website: 'https://w7.pngwing.com/pngs/549/715/png-transparent-web-development-logo-website-web-design-symmetry-internet.png',
	vk: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/VK.com-logo.svg/2048px-VK.com-logo.svg.png',
	twitter: 'https://upload.wikimedia.org/wikipedia/ru/thumb/9/9f/Twitter_bird_logo_2012.svg/2522px-Twitter_bird_logo_2012.svg.png',
	instagram: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png',
	youtube: 'https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png',
	github: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
	mainLink: 'https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg'
};

const UserLink: React.FC<propsType> = ({link, name}) => {
	return (
		<a href={link} target="._blank">
			<img width="20px" height="20px" src={images[name]} alt={name}/>
		</a>
	);
};

export default UserLink;