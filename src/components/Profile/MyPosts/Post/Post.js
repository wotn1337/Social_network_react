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
				src="data:image/png;base64,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"
				alt="Like"
				height="20px"
			/>
		</div>
	);
};

export default Post;