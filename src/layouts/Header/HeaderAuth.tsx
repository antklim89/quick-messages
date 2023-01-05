import { Button, MenuItem } from '@chakra-ui/react';
import { FC } from 'react';
import Auth from '~/layouts/Auth';
import { useLogoutRequest, useUser } from '~/requests';


const HeaderAuth: FC = () => {
    const { mutate: handleLogout, isLoading } = useLogoutRequest();
    const { isAuth } = useUser();

    if (isAuth) return (
        <>
            <Button
                as={MenuItem}
                variant="ghost"
            >
                PROFILE
            </Button>
            <Button
                as={MenuItem}
                isDisabled={isLoading}
                variant="ghost"
                onClick={handleLogout}
            >
                LOGOUT
            </Button>
        </>
    );
    return (
        <>
            <Auth as={MenuItem} />
            <Auth as={MenuItem} defaultType="register" />
        </>
    );
};

export default HeaderAuth;
