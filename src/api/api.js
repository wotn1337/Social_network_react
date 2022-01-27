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
	},

	updateAvatar(avatar) {
		const data = new FormData();
		data.append('image', avatar);
		return instance.put('profile/photo', data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	},

	updateProfile(data) {
		return instance.put('profile', data);
	},
};

export const authAPI = {
	auth() {
		return instance.get('auth/me');
	},

	login(email, password, rememberMe = false, captcha) {
		return instance.post('auth/login', {email, password, rememberMe, captcha});
	},

	logout() {
		return instance.delete('auth/login');
	},

	getCaptchaUrl() {
		return instance.get('security/get-captcha-url');
	},
};
