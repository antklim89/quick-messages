
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
}) | null

export function transformMessage(message: DatabaseMessage, userId?: string | null) {
    if (!message) return null;
    return {
        ...message,
        messagesCount: Array.isArray(message.messages) ? message.messages[0]?.count : message.messages?.count,
        likesCount: Array.isArray(message.likes) ? message.likes.length : 0,
        hasLiked: Array.isArray(message.likes) ? (message.likes.findIndex((i) => i.user === userId) >= 0) : false,
    };
}
