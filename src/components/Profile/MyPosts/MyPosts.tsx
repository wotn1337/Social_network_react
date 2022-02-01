import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {ErrorMessage, Form, Field, Formik} from "formik";
import {maxLength} from "../../../utils/validators/validators";
import {postType} from "../../../types/types";

type formPropsType = {
    addPost: (post: string) => void
}

type propsType = {
    posts: Array<postType>,
    addPost: (post: string) => void,
    profileImage: string
}

const NewPost: React.FC<formPropsType> = (props) => (
    <div>
        <Formik
            initialValues={{post: ''}}
            validate={values => {
                const errors = {};
                if (maxLength(100)(values.post)) {
                    // @ts-ignore
                    errors.post = maxLength(100)(values.post);
                }
                return errors;
            }}
            onSubmit={(values, {resetForm}) => {
                props.addPost(values.post);
                resetForm();
            }}
        >
            <Form>
                <Field component={'textarea'} name={'post'}/>
                <ErrorMessage name={'post'} component={'div'} className={s.validationMessage}/>
                <button type="submit" className={s.new_post_button}>Post</button>
            </Form>
        </Formik>
    </div>
);

const MyPosts: React.FC<propsType> = ({addPost, posts, ...props}) => {
    const postsElements = posts.map(post => (
        <Post
            message={post.post}
            likesCount={post.likesCount}
            profileImage={props.profileImage}
            key={post.id}
        />
    ));

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
