import {auth} from "./authReducer";

const SET_INITIALIZED = 'SET_INITIALIZED';


const initailState = {
	initialized: false
};

const appReducer = (state = initailState, action) => {
	switch (action.type) {
		case SET_INITIALIZED:
			return {
				...state,
				initialized: true
			};

		default:
			return state;
	}
};

const setInitialized = () => {
	return {
		type: SET_INITIALIZED
	};
};

export const initializeApp = () => (dispatch) => {
	const promise = dispatch(auth());
	promise.then(() => dispatch(setInitialized()));
};

export default appReducer;