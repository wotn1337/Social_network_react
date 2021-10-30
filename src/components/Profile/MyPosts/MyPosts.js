import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {ErrorMessage, Form, Field, Formik} from "formik";
import {maxLength} from "../../../utils/validators/validators";



const NewPost = (props) => (
	<div>
		<Formik
			initialValues={{post: ''}}
			validate={values => {
				const errors = {};
				if (maxLength(100)(values.post)) {
					errors.post = maxLength(100)(values.post);
				}
				return errors;
			}}
			onSubmit={(values) => {
				props.addPost(values.post);
			}}
		>
			{() => (
				<Form>
					<Field component={'textarea'} name={'post'}/>
					<ErrorMessage name={'post'} component={'div'} className={s.validationMessage}/>
					<button type="submit" className={s.new_post_button}>Post</button>
				</Form>
			)}
		</Formik>
	</div>
);

const MyPosts = (props) => {
	const postsElements = props.posts.map(post => (
		<Post
			message={post.post}
			likesCount={post.likesCount}
			profileImage={props.profileImage}
			key={post.id}
		/>
	));

	const addPost = (post) => {
		props.addPost(post);
	};

	return (
		<div>
			<h2>My posts</h2>
			<div className={s.new_post}>
				<NewPost addPost={addPost}/>
			</div>
			<div className={s.posts}>
				{postsElements}
			</div>
		</div>
	);
};

export default MyPosts;