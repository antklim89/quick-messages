import { Box, Button } from '@chakra-ui/react';
import { FC } from 'react';
import Auth from '~/layouts/Auth';
import { useLogoutRequest, useUser } from '~/requests';


const HeaderAuth: FC = () => {
    const { mutate: handleLogout, isLoading } = useLogoutRequest();
    const { isAuth } = useUser();

    return (
        <nav>
            <Box as="ul" display="flex" listStyleType="none">
                {isAuth
                    ? (
                        <>
                            <Box as="li" >
                                <Button variant="ghost">
                                    PROFILE
                                </Button>
                            </Box>
                            <Box as="li" >
                                <Button
                                    isDisabled={isLoading}
                                    isLoading={isLoading}
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
