import {instance} from "./instance";


export const usersAPI = {
	getUsers(page = 1, size = 10) {
		return instance.get(`users?page=${page}&count=${size}`);
	},

	unfollow(id) {
		return instance.delete(`follow/${id}`);
	},

	follow(id) {
		return instance.post(`follow/${id}`);
	}
};

export const profileAPI = {
	setUserProfile(id) {
		return instance.get(`profile/${id}`);
	},

	getStatus(id) {
		return instance.get(`profile/status/${id}`);
	},

	updateStatus(status) {
		return instance.put(`profile/status`, {status});
	}
};

export const authAPI = {
	auth() {
		return instance.get('auth/me');
	},

	login(email, password, rememberMe = false) {
		return instance.post('auth/login', {email, password, rememberMe});
	},

	logout() {
		return instance.delete('auth/login');
	}
};
