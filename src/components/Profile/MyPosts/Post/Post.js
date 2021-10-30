import React from "react";
import s from './Post.module.css';

const Post = ({message, likesCount, profileImage}) => {
	return (
		<div className={s.item}>
			<img
				className={s.avatar}
				src={profileImage}
				alt="Post avatar"
				height="50px"
			/>
			{message}
			<span className={s.likesCount}>{likesCount}</span>
			<img
				className={s.like}
				src="https://ggsel.com/products_images/2603000/medium/p1_2603000_fab5e381.webp"
				alt="Like"
				height="20px"
			/>
		</div>
	);
};

export default Post;