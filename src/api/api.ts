import {instance} from "./instance";
import {profileType, userType} from "../types/types";


type usersResponseType = {
    items: Array<userType>,
    totalCount: number,
    error: string
}

type followUnfollowResponseType = {
    resultCode: number,
    messages: Array<string>,
    data: any
}

export const usersAPI = {
    getUsers(page = 1, size = 10) {
        return instance.get<usersResponseType>(`users?page=${page}&count=${size}`);
    },

    unfollow(id: number) {
        return instance.delete<followUnfollowResponseType>(`follow/${id}`);
    },

    follow(id: number) {
        return instance.post<followUnfollowResponseType>(`follow/${id}`);
    }
};


export const profileAPI = {
    setUserProfile(id: number) {
        return instance.get<profileType>(`profile/${id}`);
    },

    getStatus(id: number) {
        return instance.get(`profile/status/${id}`);
    },

    updateStatus(status: string) {
        return instance.put(`profile/status`, {status});
    },

    updateAvatar(avatar: File) {
        const data = new FormData();
        data.append('image', avatar);
        return instance.put('profile/photo', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    updateProfile(data: any) {
        return instance.put('profile', data);
    },
};

export const authAPI = {
    auth() {
        return instance.get('auth/me');
    },

    login(email: string, password: string, rememberMe = false, captcha: string | null) {
        return instance.post('auth/login', {email, password, rememberMe, captcha});
    },

    logout() {
        return instance.delete('auth/login');
    },

    getCaptchaUrl() {
        return instance.get('security/get-captcha-url');
    },
};
