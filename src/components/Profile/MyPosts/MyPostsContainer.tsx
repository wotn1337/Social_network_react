import {addPost} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {appStateType} from "../../../redux/reduxStore";
import {postType} from "../../../types/types";

type mapStateToPropsType = {
	posts: Array<postType>,
	profileImage: string
}

type mapDispatchToPropsType = {
	addPost: (post: string) => void
}

const mapStateToProps = (state: appStateType): mapStateToPropsType => {
	const avatarPlaceHolder = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
	return {
		posts: state.profile.postsData,
		profileImage: state.profile.profile?.photos.small || avatarPlaceHolder
	};
};

const mapDispatchToProps: mapDispatchToPropsType = { addPost }

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;