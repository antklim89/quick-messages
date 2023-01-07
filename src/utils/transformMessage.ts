
type DatabaseMessage = ({
    messages: {
        count: unknown;
    } | {
        count: unknown;
    }[] | null;
} & {
    likes: {
        user: string;
    } | {
        user: string;
    }[] | null;
} & {
    favorites: {
        user: string;
    } | {
        user: string;
    }[] | null;
}) | null

export function transformMessage(message: DatabaseMessage, userId?: string | null) {
    if (!message) return null;
    const { likes, favorites, messages, ...rest } = message;

    return {
        ...rest,
        messagesCount: Array.isArray(messages) ? messages[0]?.count : messages?.count,
        likesCount: Array.isArray(likes) ? likes.length : 0,
        hasLiked: Array.isArray(likes) ? (likes.findIndex((i) => i.user === userId) >= 0) : false,
        favoritesCount: Array.isArray(favorites) ? favorites.length : 0,
        inFavorites: Array.isArray(favorites) ? (favorites.findIndex((i) => i.user === userId) >= 0) : false,
    };
}
