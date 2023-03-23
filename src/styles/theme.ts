import { cardAnatomy } from '@chakra-ui/anatomy';
import { extendTheme, Theme, ThemeOverride, createMultiStyleConfigHelpers, defineStyleConfig } from '@chakra-ui/react';


const customTheme: ThemeOverride<Theme> = {
    config: {
        initialColorMode: 'system',
        useSystemColorMode: true,
    },
    colors: {
        primary: {
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
            baseStyle: {
                borderRadius: 9999,
            },
        }),

        Card: createMultiStyleConfigHelpers(cardAnatomy.keys)
            .defineMultiStyleConfig({
                baseStyle: {
                    container: {
                        borderColor: 'primary.600',
                        borderWidth: 'thin',
                        boxShadow: 'md',
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
                },
            }),
    },
};

const theme = extendTheme(customTheme);

export type CustomTheme = typeof customTheme & Theme;

export default theme;
