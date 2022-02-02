import {profileAPI} from "../api/api";
import {photosType, postType, profileType } from "../types/types";
import {ThunkAction} from "redux-thunk";
import {appStateType} from "./reduxStore";

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
	] as Array<postType>,
	profile: null as profileType | null,
	status: null as string | null
};

export type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionsTypes): initialStateType => {
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
					photos: action.photos
				} as profileType
			};

		default:
			return state;
	}
}

type ActionsTypes = addPostACType
	| setUserProfileAccessActionType
	| setUserStatusActionType
	| deletePostActionType
	| updateAvatarSuccessActionType

type addPostACType = { type: typeof ADD_POST, post: string }
export const addPost = (post: string): addPostACType => ({type: ADD_POST, post});

type setUserProfileAccessActionType = { type: typeof SET_USER_PROFILE, profile: profileType}
export const setUserProfileAccess = (profile: profileType): setUserProfileAccessActionType => ({type: SET_USER_PROFILE, profile});

type setUserStatusActionType = { type: typeof SET_STATUS, status: string}
export const setUserStatus = (status: string): setUserStatusActionType => ({type: SET_STATUS, status});

type deletePostActionType = { type: typeof DELETE_POST, id: number }
export const deletePost = (id: number): deletePostActionType => ({type: DELETE_POST, id});

type updateAvatarSuccessActionType = { type: typeof UPDATE_AVATAR, photos: photosType}
export const updateAvatarSuccess = (photos: photosType): updateAvatarSuccessActionType => ({type: UPDATE_AVATAR, photos});

type ThunkType = ThunkAction<Promise<void>, appStateType, unknown, ActionsTypes>

export const setUserProfile = (id: number): ThunkType => async (dispatch) => {
	const response = await profileAPI.setUserProfile(id);
	dispatch(setUserProfileAccess(response.data));
};

export const getStatus = (id: number): ThunkType => async (dispatch) => {
	const response = await profileAPI.getStatus(id);
	dispatch(setUserStatus(response.data));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
	const response = await profileAPI.updateStatus(status);
	if (response.data.resultCode === 0) {
		dispatch(setUserStatus(status));
	}
};

export const updateAvatar = (avatar: File): ThunkType => async (dispatch) => {
	const response = await profileAPI.updateAvatar(avatar);
	if (response.data.resultCode === 0) {
		dispatch(updateAvatarSuccess(response.data.data.photos));
	}
};

export const updateProfile = (data: any): ThunkType => async () => {
	const response = await profileAPI.updateProfile(data);
	if (response.data.resultCode === 0) {
		alert('success!');
	}
};


export default profileReducer;