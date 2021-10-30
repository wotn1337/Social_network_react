import {addPost} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
	const avatarPlaceHolder = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
	return {
		posts: state.profile.postsData,
		profileImage: state.profile.profile.photos.small ? state.profile.profile.photos.small : avatarPlaceHolder
	};
};


const MyPostsContainer = connect(mapStateToProps, {
	addPost
})(MyPosts);

export default MyPostsContainer;