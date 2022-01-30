import {usersAPI} from "../api/api";
import {userType} from "../types/types";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'users/TOGGLE_FOLLOWING_IN_PROGRESS';


const initialState = {
    users: [] as Array<userType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
};

export type initialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any) => {
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
type followAccessActionType = { type: typeof FOLLOW, userId: number }
export const followAccess = (userId: number): followAccessActionType => ({type: FOLLOW, userId});

type unfollowAccessActionType = { type: typeof UNFOLLOW, userId: number }
export const unfollowAccess = (userId: number): unfollowAccessActionType => ({type: UNFOLLOW, userId});

type setUsersActionType = { type: typeof SET_USERS, users: Array<userType> }
export const setUsers = (users: Array<userType>): setUsersActionType => ({type: SET_USERS, users});

type setCurrentPageActionType = { type: typeof SET_CURRENT_PAGE, pageNumber: number }
export const setCurrentPage = (pageNumber: number): setCurrentPageActionType => ({type: SET_CURRENT_PAGE, pageNumber});

type setTotalUsersCountActionType = { type: typeof SET_TOTAL_USERS_COUNT, count: number }
export const setTotalUsersCount = (count: number): setTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    count
});

type toggleIsFetchingActionType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean }
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
});

type toggleFollowingInProgressActionType = { type: typeof TOGGLE_FOLLOWING_IN_PROGRESS, isFetching: boolean, id: number }
export const toggleFollowingInProgress = (isFetching: boolean, id: number): toggleFollowingInProgressActionType => ({
    type: TOGGLE_FOLLOWING_IN_PROGRESS,
    isFetching,
    id
});

export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    const response = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setTotalUsersCount(response.data.totalCount));
    dispatch(setUsers(response.data.items));
}

export const changePage = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    const response = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setTotalUsersCount(response.data.totalCount));
    dispatch(setCurrentPage(currentPage));
    dispatch(setUsers(response.data.items));
}

const followUnfollowFlow = async (dispatch: any, id: number, apiMethod: Function, actionCreator: Function) => {
    dispatch(toggleFollowingInProgress(true, id));
    const response = await apiMethod(id);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(id));
    }
    dispatch(toggleFollowingInProgress(false, id));
}

export const follow = (id: number) => async (dispatch: any) => {
    await followUnfollowFlow(dispatch, id, usersAPI.follow, followAccess);
}

export const unfollow = (id: number) => async (dispatch: any) => {
    await followUnfollowFlow(dispatch, id, usersAPI.unfollow, unfollowAccess);
};

export default usersReducer;