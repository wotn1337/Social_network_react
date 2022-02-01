import { appStateType } from "./reduxStore";

export const getStateUsers = (state: appStateType) => state.users.users;

export const getPageSize = (state: appStateType) => state.users.pageSize;

export const getTotalUsersCount = (state: appStateType) => state.users.totalUsersCount;

export const getCurrentPage = (state: appStateType) => state.users.currentPage;

export const getIsFetching = (state: appStateType) => state.users.isFetching;

export const getFollowingInProgress = (state: appStateType) => state.users.followingInProgress;