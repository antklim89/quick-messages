import { Box, Button } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { useUser } from '~/hooks';
import Auth from '~/layouts/Auth';
import { logoutRequest } from '~/requests/authRequests';


const HeaderAuth: FC = () => {
    const { isAuth } = useUser();

    const handleLogout = useCallback(async () => {
        await logoutRequest();
        window.location.reload();
    }, []);

    return (
        <nav>
            <Box as="ul" display="flex" listStyleType="none">
                {isAuth
                    ? (
                        <>
                            <Box as="li" >
                                <Button
                                    variant="ghost"
                                >
                                    PROFILE
                                </Button>
                            </Box>
                            <Box as="li" >
                                <Button
                                    variant="ghost"
                                    onClick={handleLogout}
                                >
                                    LOGOUT
                                </Button>
                            </Box>
                        </>)
                    : (
                        <>
                            <Box as="li" >
                                <Auth />
                            </Box>
                            <Box as="li" >
                                <Auth defaultType="register" />
                            </Box>
                        </>
                    )}
            </Box>
        </nav>
    );
};

export default HeaderAuth;
