import { ReactNode } from 'react';


export interface ConfirmDialogProps {
    children: (onToggle: () => void) => ReactNode;
    confirmText?: string;
    cancelText?: string;
    message?: string;
    onConfirm: (onToggle: () => void) => Promise<void> | void;
    isLoading?: boolean;
}
