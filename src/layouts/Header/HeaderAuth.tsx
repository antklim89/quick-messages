import { MenuItem } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import Auth from '~/layouts/Auth';
import { useLogoutRequest, useUser } from '~/requests';
import { getRoute } from '~/utils';


const HeaderAuth: FC = () => {
    const { mutate: handleLogout, isLoading } = useLogoutRequest();
    const { isAuth } = useUser();

    if (isAuth) return (
        <>
            <MenuItem
                as={Link}
                to={getRoute('profile', {})}
            >
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
