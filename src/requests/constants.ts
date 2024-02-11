export const MESSAGES_LIMIT = 10;

export type FindMessagesQueryKey = ['FIND_MESSAGES', {answerToId?: number, authorId?: string, subjectBody?: string}]
export type FindMessageQueryKey = ['FIND_MESSAGE', {messageId: number}]
export type FavsMessagesQueryKey = ['FAVS_MESSAGES']
export type SubjectsQueryKey = ['SUBJECTS', {body?: string}]
export type AvatarDownloadQueryKey = ['AVATAR_DOWNLOAD', {authorId?: string | null}]
export type GetUserQueryKey = ['GET_USER']
export type ProfileQueryKey = ['PROFILE', {profileId?: string}]
export type SubscriptionsQueryKey = ['SUBSCRIPTIONS', {subjectBody?: string}]
