export const MESSAGES_LIMIT = 10;


export type QueryKey =
    [key: 'FIND_MESSAGES', answerToId?: number, authorId?: string, subjectBody?: string] |
    [key: 'FIND_MESSAGE', messageId: number] |
    [key: 'SUBJECTS', body?: string] |
    [key: 'FAVORITES_BUTTON', messageId: number] |
    [key: 'FAVORITES_LIST'] |
    [key: 'AVATAR_DOWNLOAD', authorId?: string | null] |
    [key: 'GET_USER'] |
    [key: 'PROFILE', profileId?: string] |
    [key: 'LIKES', messageId: number]
