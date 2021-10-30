import {usersAPI} from "../api/api";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'users/TOGGLE_FOLLOWING_IN_PROGRESS';


const initailState = {
	users: [],
	pageSize: 10,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: []
};

const usersReducer = (state = initailState, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: state.users.map(user => {
					if (user.id === action.userId) {
						return {...user, followed: true};
					}
					return user;
				})
			};

		case UNFOLLOW:
			return {
				...state,
				users: state.users.map(user => {
					if (user.id === action.userId) {
						return {...user, followed: false};
					}
					return user;
				})
			};

		case SET_USERS:
			return {...state, users: action.users};

		case SET_CURRENT_PAGE:
			return {...state, currentPage: action.pageNumber};

		case SET_TOTAL_USERS_COUNT:
			return {...state, totalUsersCount: action.count};

		case TOGGLE_IS_FETCHING:
			return {...state, isFetching: action.isFetching};

		case TOGGLE_FOLLOWING_IN_PROGRESS:
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.id]
					: [...state.followingInProgress.filter(id => id !== action.id)]
			};

		default:
			return state;
	}
};

export const followAccess = (userId) => ({type: FOLLOW, userId});
export const unfollowAccess = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (pageNumber) => ({type: SET_CURRENT_PAGE, pageNumber});
export const setTotalUsersCount = (count) => ({type: SET_TOTAL_USERS_COUNT, count});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingInProgress = (isFetching, id) => ({type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching, id});

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
	dispatch(toggleIsFetching(true));
	const response = await usersAPI.getUsers(currentPage, pageSize);
	dispatch(toggleIsFetching(false));
	dispatch(setTotalUsersCount(response.data.totalCount));
	dispatch(setUsers(response.data.items));
}

export const changePage = (currentPage, pageSize) => async (dispatch) => {
	dispatch(toggleIsFetching(true));
	const response = await usersAPI.getUsers(currentPage, pageSize);
	dispatch(toggleIsFetching(false));
	dispatch(setTotalUsersCount(response.data.totalCount));
	dispatch(setCurrentPage(currentPage));
	dispatch(setUsers(response.data.items));
}

const followUnfollowFlow = async (dispatch, id, apiMethod, actionCreator) => {
	dispatch(toggleFollowingInProgress(true, id));
	const response = await apiMethod(id);
	if (response.data.resultCode === 0) {
		dispatch(actionCreator(id));
	}
	dispatch(toggleFollowingInProgress(false, id));
}

export const follow = (id) => async (dispatch) => {
	await followUnfollowFlow(dispatch, id, usersAPI.follow, followAccess);
}

export const unfollow = (id) => async (dispatch) => {
	await followUnfollowFlow(dispatch, id, usersAPI.unfollow, unfollowAccess);
};

export default usersReducer;