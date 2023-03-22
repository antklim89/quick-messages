import { FC } from 'react';
import { ProtectedProps } from './Protected.types';
import NotFound from '~/components/RouterError';
import { useUser } from '~/requests-hooks';


const Protected: FC<ProtectedProps> = ({
    children,
    protectIfAuth = false,
    disableProtection = false,
    protectedComponent = <NotFound />,
}) => {
    const { isAuth } = useUser();

    if (disableProtection) return <>{children}</>;

    const isProtected = isAuth ? protectIfAuth : !protectIfAuth;

    if (isProtected) return <>{protectedComponent}</>;

    return <>{children}</>;
};

export default Protected;

