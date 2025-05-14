import styled from "styled-components";
import Stack from '@mui/material/Stack';

export const PaginationStyles = styled(Stack)`
    align-items: center;
    margin: 20px 0;
    
    
    & .MuiPagination-ul {
        flex-wrap: nowrap;
    }

    & .MuiButtonBase-root {
        color: ${({ theme }) => theme.text};
    }
    
    & .MuiFormControl-root {
        margin: 0;
    }
`