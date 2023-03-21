import { cardAnatomy } from '@chakra-ui/anatomy';
import { extendTheme, Theme, ThemeOverride, createMultiStyleConfigHelpers } from '@chakra-ui/react';


const customTheme: ThemeOverride<Theme> = {
    colors: {
        primary: {
            50: 'hsl(203, 77%, 92%)',
            100: 'hsl(203, 77%, 80%)',
            200: 'hsl(203, 77%, 72%)',
            300: 'hsl(203, 77%, 64%)',
            400: 'hsl(203, 77%, 58%)',
            500: 'hsl(203, 77%, 50%)',
            600: 'hsl(203, 77%, 42%)',
            700: 'hsl(203, 77%, 36%)',
            800: 'hsl(203, 77%, 28%)',
            900: 'hsl(203, 77%, 20%)',
        },
    },
    fonts: {
        body: 'Roboto, -apple-system, Segoe UI, Ubuntu, Droid Sans, sans-serif',
    },
    components: {
        Container: {
            baseStyle: {
                maxWidth: 'container.xl',
            },
        },
        Button: {
            defaultProps: {
                variant: 'solid',
                colorScheme: 'primary',
            },
        },
        Card: createMultiStyleConfigHelpers(cardAnatomy.keys)
            .defineMultiStyleConfig({
                baseStyle: {
                    container: {
                        borderColor: 'primary.600',
                        borderRadius: 'lg',
                        borderWidth: 'thin',
                        boxShadow: 'md',
                    },
                    header: {
                        alignItems: 'center',
                        display: 'flex',
                    },
                },
            }),
    },
};

const theme = extendTheme(customTheme);

export type CustomTheme = typeof customTheme & Theme;

export default theme;
