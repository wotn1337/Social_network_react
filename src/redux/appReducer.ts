import {auth} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {appStateType} from "./reduxStore";

const SET_INITIALIZED = 'SET_INITIALIZED';

export type initialStateType = {
	initialized: boolean
};

const initialState: initialStateType = {
	initialized: false
};

const appReducer = (state = initialState, action: ActionsTypes): initialStateType => {
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

type ActionsTypes = setInitializedActionType

type setInitializedActionType = { type: typeof SET_INITIALIZED }
const setInitialized = (): setInitializedActionType => ( { type: SET_INITIALIZED } );

type ThunkType = ThunkAction<Promise<void>, appStateType, unknown, ActionsTypes>

export const initializeApp = () => (dispatch: any) => {
	const promise = dispatch(auth());
	promise.then(() => dispatch(setInitialized()));
};

export default appReducer;