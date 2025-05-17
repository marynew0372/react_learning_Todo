import styled from 'styled-components';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export const FormControlStyled = styled(FormControl)`
    margin: 20px 0 !important;

    .MuiFormLabel-root {
        color: ${({ theme }) => theme.text};
    }

    .MuiInputBase-root {
        color: ${({ theme }) => theme.text};
    }

    .MuiSvgIcon-root {
        color: ${({ theme }) => theme.text};
    }
`

export const InputLabelStyled = styled(InputLabel)`
    color: ${({ theme }) => theme.borderInput}

    & .MuiInputBase-root {
        color: ${({ theme }) => theme.text} !important;
    }
`

export const OutlinedInputStyled = styled(OutlinedInput)`
    fieldset {
        border-color: ${({ theme }) => theme.borderInput};
    }
`