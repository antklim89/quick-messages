export const MESSAGES_LIMIT = 10;

export type FindMessagesQueryKey = ['FIND_MESSAGES', {answerToId?: number, authorId?: string, subjectBody?: string}]
export type FindMessageQueryKey = ['FIND_MESSAGE', {messageId: number}]
export type SubjectsQueryKey = ['SUBJECTS', {body?: string}]
export type FavoritesButtonQueryKey = ['FAVORITES_BUTTON', {messageId: number}]
export type FavoritesListQueryKey = ['FAVORITES_LIST']
export type AvatarDownloadQueryKey = ['AVATAR_DOWNLOAD', {authorId?: string | null}]
export type GetUserQueryKey = ['GET_USER']
export type ProfileQueryKey = ['PROFILE', {profileId?: string}]
export type LikesQueryKey = ['LIKES', {messageId: number}]
export type SubscriptionsQueryKey = ['SUBSCRIPTIONS', {subjectBody?: string}]
