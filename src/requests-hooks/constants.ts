export const QueryName = {
    FIND_MESSAGES: 'FIND_MESSAGES',
    FIND_MESSAGE: 'FIND_MESSAGE',
    GET_USER: 'GET_USER',
    PROFILE: 'PROFILE',
    LIKES: 'LIKES',
    FAVORITES: 'FAVORITES',
    MY_FAVORITES: 'MY_FAVORITES',
    SUBJECTS: 'SUBJECTS',
    AVATAR_DOWNLOAD: 'AVATAR_DOWNLOAD',
} as const;

export type QueryName = typeof QueryName[keyof typeof QueryName]

export const MESSAGES_LIMIT = 10;

export type MessagesQueryKey = [
    key: typeof QueryName.FIND_MESSAGES,
    answerToId?: number,
    authorId?: string,
    subjectBody?: string
]
