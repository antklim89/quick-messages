import { FC } from 'react';
import { ProtectedProps } from './Protected.types';
import ProtectedNotFound from './ProtectedNotFound';
import { useUser } from '~/requests-hooks';


const Protected: FC<ProtectedProps> = ({
    children,
    protectIfAuth = false,
    disableProtection = false,
    protectedComponent = <ProtectedNotFound />,
}) => {
    const { isAuth } = useUser();

    if (disableProtection) return <>{children}</>;

    const isProtected = isAuth ? protectIfAuth : !protectIfAuth;

    if (isProtected) return <>{protectedComponent}</>;

    return <>{children}</>;
};

export default Protected;

