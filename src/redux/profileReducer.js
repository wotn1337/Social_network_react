import {profileAPI} from "../api/api";

const ADD_POST = 'profile/ADD_POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const UPDATE_AVATAR = 'profile/UPDATE_AVATAR';


const initialState = {
	mainImage: 'https://robbycook.files.wordpress.com/2013/07/avengers_design_wip_031.jpg',
	postsData: [
		{id: 1, post: "HULK!!!!!!!!!!!!!!!", likesCount: 20},
		{id: 2, post: "SMASH!!!!!!!!!!!!!!", likesCount: 21230},
		{id: 3, post: "LIKE", likesCount: 21211130},
		{id: 4, post: "IIIIIIIIIIIIIIIITTTTTTTTTTTTTTTTTTTTTTTTT", likesCount: 0},
	],
	profile: null,
	status: ''
};

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			const newPost = {
				id: state.postsData.length + 1,
				post: action.post,
				likesCount: 0
			};
			return {
				...state,
				postsData: [newPost, ...state.postsData],
			};

		case SET_USER_PROFILE:
			return {
				...state,
				profile: action.profile,
			};

		case SET_STATUS:
			return {
				...state,
				status: action.status
			}

		case DELETE_POST:
			return {
				...state,
				postsData: state.postsData.filter(post => post.id !== action.id)
			}

		case UPDATE_AVATAR:
			return {
				...state,
				profile: {
					...state.profile,
					photos: {
						...state.profile.photos,
						large: action.photos.large,
						small: action.photos.small,
					}
				}
			};

		default:
			return state;
	}
}


export const addPost = (post) => ({type: ADD_POST, post});
export const setUserProfileAccess = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (id) => ({type: DELETE_POST, id});
export const updateAvatarSuccess = (photos) => ({type: UPDATE_AVATAR, photos});

export const setUserProfile = (id) => async (dispatch) => {
	const response = await profileAPI.setUserProfile(id);
	dispatch(setUserProfileAccess(response.data));
};

export const getStatus = (id) => async (dispatch) => {
	const response = await profileAPI.getStatus(id);
	dispatch(setUserStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
	const response = await profileAPI.updateStatus(status);
	if (response.data.resultCode === 0) {
		dispatch(setUserStatus(status));
	}
};

export const updateAvatar = (avatar) => async (dispatch) => {
	const response = await profileAPI.updateAvatar(avatar);
	if (response.data.resultCode === 0) {
		dispatch(updateAvatarSuccess(response.data.data.photos));
	}
};

export const updateProfile = (data) => async () => {
	const response = await profileAPI.updateProfile(data);
	if (response.data.resultCode === 0) {
		//dispatch(updateAvatarSuccess(response.data.data.photos));
		alert('success!');
	}
};


export default profileReducer;