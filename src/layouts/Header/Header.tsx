import {
    Box, Text, Container, Divider, DrawerCloseButton, useMediaQuery, useTheme,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import HeaderAuth from './HeaderAuth';
import HeaderDrawer from './HeaderDrawer';
import HeaderLinks from './HeaderLinks';
import { CustomTheme } from '~/styles/theme';
import { getRoute } from '~/utils';


const Header: FC = () => {
    const { breakpoints } = useTheme<CustomTheme>();
    const [isLargerThen] = useMediaQuery(`(min-width: ${breakpoints.md})`);

    return (
        <Box as="header" shadow="md" >
            <Container alignItems="center" display="flex" maxWidth="container.xl">
                <Text
                    as={Link}
                    color="primary.800"
                    fontSize="2xl"
                    to={getRoute('home', {})}
                >
                    Quick Messages
                </Text>
                <Box flexGrow={1} />

                {isLargerThen
                    ? (
                        <>
                            <HeaderLinks />
                            <HeaderAuth />
                        </>
                    )
                    : (
                        <HeaderDrawer>
                            <DrawerCloseButton />
                            <HeaderLinks flexDirection="column" />
                            <Divider bg="primary.text" my={4} />
                            <HeaderAuth />
                        </HeaderDrawer>
                    )}
            </Container>
        </Box>
    );
};

export default Header;

