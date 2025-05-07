import styled from "styled-components";
import Dialog from '@mui/material/Dialog';

export const EditTodoCustom = styled(Dialog)`
    & .MuiPaper-root {
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.text};
    }
    
    & .MuiFormLabel-root {
        color: ${({ theme }) => theme.text};
    }

    & .MuiInputBase-input {
        color: ${({ theme }) => theme.text};
    }

    & .MuiInputBase-root {
        border-bottom: unset;
    }

    // & .MuiInputBase-root-root:hover .MuiInputBase-root-notchedOutline {
    //     border-bottom: ${({ theme }) => theme.InputborderColorHover};
    // }

    // & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    //     border-color: ${({ theme }) => theme.InputborderColorFocus};
    // }
`