import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import navbarReducer from "./navbarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import appReducer from "./appReducer";


const rootReducer = combineReducers({
	profile: profileReducer,
	dialogs: dialogsReducer,
	navbar: navbarReducer,
	users: usersReducer,
	auth: authReducer,
	app: appReducer
});

type rootReducerType = typeof rootReducer;
export type appStateType = ReturnType<rootReducerType>;

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;