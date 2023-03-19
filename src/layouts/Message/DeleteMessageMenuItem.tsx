import { MenuItem } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import ConfirmDialog from '~/components/ConfirmDialog';
import { useDeleteMessageRequest, useUser } from '~/requests-hooks';


const DeleteMessageMenuItem: FC<{authorId: string, messageId: number}> = ({ authorId, messageId }) => {
    const { id } = useUser();
    const { mutate, isLoading } = useDeleteMessageRequest({ messageId });
    const handleDeleteMessage = useCallback(() => mutate(), []);

    if (id !== authorId) return null;
    return (
        <ConfirmDialog
            confirmText="Delete"
            isLoading={isLoading}
            message="Are you sure you want to delete this message?"
            onConfirm={handleDeleteMessage}
        >
            {(toggle) => (
                <MenuItem onClick={toggle}>
                    Delete
                </MenuItem>
            )}
        </ConfirmDialog>
    );
};

export default DeleteMessageMenuItem;
