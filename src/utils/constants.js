export const GENERIC_AVATAR_URL = 'http://via.placeholder.com/512x512'

export const getAvatar = (avatarUrl) => {
    return avatarUrl && avatarUrl.length ? avatarUrl : GENERIC_AVATAR_URL
}