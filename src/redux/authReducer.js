import {authAPI} from "../api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA';


const initialState = {
	id: null,
	email: null,
	login: null,
	isAuth: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.data,
				isAuth: action.isAuth
			};

		default:
			return state;
	}
};

const setAuthUserData = (id, email, login, isAuth) => {
	return {
		type: SET_USER_DATA,
		data: {id, email, login},
		isAuth
	};
};

export const auth = () => async (dispatch) => {
	const response = await authAPI.auth();
	if (response.data.resultCode === 0) {
		dispatch(setAuthUserData(
			response.data.data.id,
			response.data.data.email,
			response.data.data.login,
			true
		));
	}
};

export const login = (email, password, rememberMe, setStatus) => async (dispatch) => {
	const response = await authAPI.login(email, password, rememberMe);
	if (response.data.resultCode === 0) {
		dispatch(auth());
	} else {
		setStatus(response.data.messages);
	}
};

export const logout = () => async (dispatch) => {
	const response = await authAPI.logout();
	if (response.data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false));
	}
};


export default authReducer;