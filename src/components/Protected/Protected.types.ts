import { ReactNode } from 'react';


export interface ProtectedProps {
     children: ReactNode
     protectIfAuth?: boolean
     initPlaceholder?: ReactNode
     protectedComponent?: ReactNode
     disableProtection?: boolean
}
