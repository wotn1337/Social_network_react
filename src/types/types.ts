export type profileType = {
    userId: number,
    fullName: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    aboutMe: string,
    photos: photosType,
    contacts: contactsType,
}
export type contactsType = {
    github: string | null,
    vk: string | null,
    facebook: string | null,
    instagram: string | null,
    youtube: string | null,
    website: string | null,
    mainLink: string | null,
    twitter: string | null
}
export type postType = { id: number, post: string, likesCount: number }
export type photosType = { small: string | null, large: string | null }
export type userType = {
    id: number,
    name: string,
    status: string | null,
    photos: photosType,
    followed: boolean
}