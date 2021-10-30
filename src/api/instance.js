import axios from "axios";


export const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: {
		'API-KEY': 'e189f8ef-a0f0-4fd3-89da-3fc396dd2535'
	}
});