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

export const follow = (id) => {
	return (dispatch) => {
		dispatch(toggleFollowingInProgress(true, id));
		usersAPI.follow(id).then(data => {
			if (data.resultCode === 0) {
				dispatch(followAccess(id));
			}
			dispatch(toggleFollowingInProgress(false, id));
		});
	}
};

export const unfollow = (id) => {
	return (dispatch) => {
		dispatch(toggleFollowingInProgress(true, id));
		usersAPI.unfollow(id).then(data => {
			if (data.resultCode === 0) {
				dispatch(unfollowAccess(id));
			}
			dispatch(toggleFollowingInProgress(false, id));
		});
	}
};


export default usersReducer;


// old users
// users: [
// 	// {
// 	// 	id: 1,
// 	// 	name: 'Tony Stark',
// 	// 	status: 'I am Iron Man',
// 	// 	avatar: "https://www.redwolf.in/image/cache/catalog/artwork-Images/mens/iron-man-mask-design-image'-700x700.png",
// 	// 	location: {country: 'USA', city: 'LA'},
// 	// 	follow: true
// 	// },
// 	// {
// 	// 	id: 2,
// 	// 	name: 'Natasha Romanoff',
// 	// 	status: 'I hate men',
// 	// 	avatar: 'https://www.soyuz.ru/public/uploads/files/2/7226065/20180924195850a357af1e7c.jpg',
// 	// 	location: {country: 'Russia', city: 'Moscow'},
// 	// 	follow: true
// 	// },
// 	// {
// 	// 	id: 3,
// 	// 	name: 'Bruce Banner',
// 	// 	status: 'Just a green scientist',
// 	// 	avatar: 'http://pm1.narvii.com/6917/ddcb129f2b7acf9e33090b14e7c2a1ed45a0a8a1r1-480-550v2_00.jpg',
// 	// 	location: {country: 'unknown', city: 'unknown'},
// 	// 	follow: true
// 	// },
// 	// {
// 	// 	id: 4,
// 	// 	name: 'Black Panter',
// 	// 	status: 'lil nigga',
// 	// 	avatar: 'https://vokrug.tv/pic/news/3/c/d/6/3cd6011fc071b97145d00936f82836e0.jpg',
// 	// 	location: {country: 'Vacanda', city: 'unknown'},
// 	// 	follow: false
// 	// }
// ]