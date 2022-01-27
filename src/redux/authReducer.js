import {authAPI} from "../api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL';


const initialState = {
	id: null,
	email: null,
	login: null,
	isAuth: false,
	captchaUrl: undefined
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.data,
				isAuth: action.isAuth
			};

		case SET_CAPTCHA_URL:
			return {...state, captchaUrl: action.url};

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

const setCaptchaUrl = (url) => ({type: SET_CAPTCHA_URL, url});

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

export const login = (email, password, rememberMe, captcha, setStatus) => async (dispatch) => {
	const response = await authAPI.login(email, password, rememberMe, captcha);
	if (response.data.resultCode === 0) {
		dispatch(auth());
	} else {
		if (response.data.resultCode === 10) {
			setStatus(response.data.messages);
			dispatch(getCaptchaUrl());
		}
	}
};

export const logout = () => async (dispatch) => {
	const response = await authAPI.logout();
	if (response.data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false));
	}
};

export const getCaptchaUrl = () => async (dispatch) => {
	const response = await authAPI.getCaptchaUrl();
	dispatch(setCaptchaUrl(response.data.url));
};


export default authReducer;