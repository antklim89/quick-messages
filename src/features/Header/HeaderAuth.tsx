import { MenuDivider, Icon, MenuItem, useColorMode } from '@chakra-ui/react';
import { FC } from 'react';
import { BsBoxArrowRight, BsMoon, BsSun } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import ConfirmDialog from '~/components/ConfirmDialog';
import Auth from '~/features/Auth';
import { useLogoutRequest, useUser } from '~/requests';


const HeaderAuth: FC = () => {
    const { mutate: handleLogout, isLoading } = useLogoutRequest();
    const { isAuth } = useUser();
    const { colorMode, toggleColorMode } = useColorMode();

    const colorModeMenu = (
        <MenuItem closeOnSelect={false} value={colorMode} onClick={toggleColorMode}>
            <Icon as={colorMode === 'light' ? BsSun : BsMoon} mr={4} />
            {colorMode === 'light' ? 'TO DARK MODE' : 'TO LIGHT MODE'}
        </MenuItem>
    );

    if (isAuth) return (
        <>
            {colorModeMenu}
            <MenuDivider />
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
                MY FAVORITES
            </MenuItem>
            <MenuDivider />
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
            {colorModeMenu}
            <MenuDivider />
            <Auth textTransform="uppercase" />
            <Auth defaultType="register" textTransform="uppercase" />
        </>
    );
};

export default HeaderAuth;
