
type DatabaseMessage = ({
    messages: {
        count: unknown;
    } | {
        count: unknown;
    }[] | null;
} & {
    likes: {
        userId: string;
    } | {
        userId: string;
    }[] | null;
} & {
    favorites: {
        userId: string;
    } | {
        userId: string;
    }[] | null;
}) | null


export function transformMessage(message: DatabaseMessage, userId?: string | null) {
    if (!message) return null;
    const { likes, favorites, messages, authorId, ...rest } = message;

    return {
        ...rest,
        author: authorId,
        messagesCount: Array.isArray(messages) ? messages[0]?.count : messages?.count,
        likesCount: Array.isArray(likes) ? likes.length : 0,
        hasLiked: Array.isArray(likes) ? (likes.findIndex((i) => i.userId === userId) >= 0) : false,
        favoritesCount: Array.isArray(favorites) ? favorites.length : 0,
        inFavorites: Array.isArray(favorites) ? (favorites.findIndex((i) => i.userId === userId) >= 0) : false,
    };
}
