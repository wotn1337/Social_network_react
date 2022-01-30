import {authAPI} from "../api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL';

export type initialStateType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null
};

const initialState: initialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action: any): initialStateType => {
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

type setAuthUserDataActionDataType = { id: number | null, email: string | null, login: string | null }
type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    data: setAuthUserDataActionDataType,
    isAuth: boolean
}
const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => ({
    type: SET_USER_DATA,
    data: {id, email, login},
    isAuth
});

type setCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL,
    url: string
}
const setCaptchaUrl = (url: string): setCaptchaUrlActionType => ({type: SET_CAPTCHA_URL, url});

export const auth = () => async (dispatch: Function) => {
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

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null, setStatus: (messages: any) => void) => async (dispatch: any) => {
    debugger
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

export const logout = () => async (dispatch: Function) => {
    const response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};

export const getCaptchaUrl = () => async (dispatch: Function) => {
    const response = await authAPI.getCaptchaUrl();
    dispatch(setCaptchaUrl(response.data.url));
};


export default authReducer;