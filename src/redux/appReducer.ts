import {auth} from "./authReducer";

const SET_INITIALIZED = 'SET_INITIALIZED';

export type initialStateType = {
	initialized: boolean
};


const initialState: initialStateType = {
	initialized: false
};

const appReducer = (state = initialState, action: any): initialStateType => {
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
type setInitializedActionType = { type: typeof SET_INITIALIZED }
const setInitialized = (): setInitializedActionType => ( { type: SET_INITIALIZED } );

export const initializeApp = () => (dispatch: Function) => {
	const promise = dispatch(auth());
	promise.then(() => dispatch(setInitialized()));
};

export default appReducer;