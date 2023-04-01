import { extendTheme, Theme, ThemeOverride, defineStyleConfig } from '@chakra-ui/react';


const customTheme: ThemeOverride<Theme> = {
    config: {
        initialColorMode: 'system',
        useSystemColorMode: true,
    },
    colors: {
        'bgDark': '#2D3748',
        'bgLight': 'white',
        'bgBodyDark': '#4A5568',
        'bgBodyLight': '#f5f5f5',
        'primary': {
            '50': '#E8F4FC',
            '100': '#C0E1F7',
            '200': '#97CEF1',
            '300': '#6FBBEC',
            '400': '#46A8E7',
            '500': '#1E95E1',
            '600': '#1878B4',
            '700': '#125A87',
            '800': '#0C3C5A',
            '900': '#061E2D',
        },
    },
    fonts: {
        body: 'Roboto, -apple-system, Segoe UI, Ubuntu, Droid Sans, sans-serif',
    },
    styles: {
        global: ({ colorMode }) => ({
            'html, body': {
                height: '100vh',
                backgroundColor: colorMode === 'light' ? 'bgBodyLight' : 'bgBodyDark',
            },
            'header': {
                backgroundColor: colorMode === 'light' ? 'bgLight' : 'bgDark',
            },
        }),
    },
    components: {
        Text: {
            defaultProps: {
                colorScheme: 'red',
            },
        },
        Container: {
            baseStyle: {
                maxWidth: 'container.xl',
                p: 2,
            },
        },
        Button: defineStyleConfig({
            defaultProps: {
                variant: 'solid',
                colorScheme: 'primary',
            },
        }),

        Accordion: {
            baseStyle: ({ colorMode }) => ({
                container: {
                    backgroundColor: colorMode === 'light' ? 'bgLight' : 'bgDark',
                },
            }),
        },

        Box: {
            baseStyle: ({ colorMode }) => ({
                container: {
                    backgroundColor: colorMode === 'light' ? 'bgLight' : 'bgDark',
                },
            }),
        },

        Card: {
            defaultProps: {
                variant: 'outline',
            },
            baseStyle: ({ colorMode }) => ({
                container: {
                    backgroundColor: colorMode === 'light' ? 'bgLight' : 'bgDark',
                    borderWidth: 'thin',
                    boxShadow: 'none',
                },
                header: {
                    alignItems: 'center',
                    display: 'flex',
                    padding: 2,
                },
                body: {
                    padding: 2,
                },
                footer: {
                    padding: 2,
                },
            }),
        },
    },
};

const theme = extendTheme(customTheme);

export type CustomTheme = typeof customTheme & Theme;

export default theme;
