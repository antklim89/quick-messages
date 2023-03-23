import { Divider, Icon, MenuItem } from '@chakra-ui/react';
import { FC } from 'react';
import { BsBoxArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import ConfirmDialog from '~/components/ConfirmDialog';
import Auth from '~/layouts/Auth';
import { useLogoutRequest, useUser } from '~/requests-hooks';


const HeaderAuth: FC = () => {
    const { mutate: handleLogout, isLoading } = useLogoutRequest();
    const { isAuth } = useUser();

    if (isAuth) return (
        <>
            <MenuItem as={Link} to="/profile/info">
                PROFILE
            </MenuItem>
            <MenuItem as={Link} to="/profile/reset-password">
                RESET PASSWORD
            </MenuItem>
            <MenuItem as={Link} to="/profile/my-messages">
                MY MESSAGES
            </MenuItem>
            <MenuItem as={Link} to="/profile/my-favorites">
                FAVORITES
            </MenuItem>
            <Divider />
            <ConfirmDialog
                confirmText="Log out"
                message="Are you sure you want to log out?"
                onConfirm={handleLogout}
            >
                {(toggle) => (
                    <MenuItem isDisabled={isLoading} onClick={toggle}>
                        <Icon as={BsBoxArrowRight} mr={2} /> LOG OUT
                    </MenuItem>
                )}
            </ConfirmDialog>
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
