export const MESSAGES_LIMIT = 10;

export type FindMessagesQueryKey = ['FIND_MESSAGES', {answerToId?: number, authorId?: string, subject?: string, isFavorites?: boolean}]
export type FindMessageQueryKey = ['FIND_MESSAGE', {messageId: number}]
export type SubjectsQueryKey = ['SUBJECTS', {body?: string}]
export type AvatarDownloadQueryKey = ['AVATAR', {authorId?: string | null}]
export type GetUserQueryKey = ['GET_USER']
export type ProfileQueryKey = ['PROFILE', {profileId?: string}]
export type SubscriptionsQueryKey = ['SUBSCRIPTIONS', {subject?: string}]
