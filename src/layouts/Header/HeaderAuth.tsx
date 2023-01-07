import { MenuItem } from '@chakra-ui/react';
import { FC } from 'react';
import Auth from '~/layouts/Auth';
import { useLogoutRequest, useUser } from '~/requests';


const HeaderAuth: FC = () => {
    const { mutate: handleLogout, isLoading } = useLogoutRequest();
    const { isAuth } = useUser();

    if (isAuth) return (
        <>
            <MenuItem >
                PROFILE
            </MenuItem>
            <MenuItem
                isDisabled={isLoading}
                onClick={handleLogout}
            >
                LOGOUT
            </MenuItem>
        </>
    );
    return (
        <>
            <Auth as="div" textTransform="uppercase" />
            <Auth as="div" defaultType="register" textTransform="uppercase" />
        </>
    );
};

export default HeaderAuth;
