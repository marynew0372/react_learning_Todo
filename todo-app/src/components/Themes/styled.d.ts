import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        background: string;
        text: string;
        borderInput: string;
        applyStyles: () => string;
        InputborderColorHover: string;
        InputborderColorFocus: string;
        borderUnderLineInput: string;
        backgroundColorBody: string;
    }
}