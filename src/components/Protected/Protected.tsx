import { FC } from 'react';
import ProtectedNotFound from './Protected.NotFound';
import { ProtectedProps } from './Protected.types';
import { useUser } from '~/hooks';


const Protected: FC<ProtectedProps> = ({
    children,
    protectIfAuth = false,
    initPlaceholder = null,
    disableProtection = false,
    protectedComponent = <ProtectedNotFound />,
}) => {
    const { authInited, isAuth } = useUser();

    if (disableProtection) return <>{children}</>;

    if (!authInited) return <>{initPlaceholder}</>;

    const isProtected = isAuth ? protectIfAuth : !protectIfAuth;

    if (isProtected) return <>{protectedComponent}</>;

    return <>{children}</>;
};

export default Protected;

