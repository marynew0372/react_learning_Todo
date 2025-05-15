// import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { fetchTodos } from '../../api/todos';
import { useDispatch, useSelector } from 'react-redux';
import { saveLimit } from '../../../store/limitSlice';
import { RootState } from '../../../store/store';
import styled from 'styled-components';

const FormControlCustomStyles = styled.div`
  & .MuiFormControl-root {
      margin: 10px 0;

    & .MuiFormLabel-root {
      color: ${({ theme }) => theme.text};
    }

    & .MuiInputBase-root {
      color: ${({ theme }) => theme.text};
    }

      & .MuiSvgIcon-root {
        color: ${({ theme }) => theme.text};
      }

      & .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }) => theme.borderInput};

        & .MuiOutlinedInput-notchedOutline:hover {
          border-color: ${({ theme }) => theme.InputborderColorHover}
        }
      }
  }
`

export default function ItemsPerPage() {
  const dispatch = useDispatch();
  const limit = useSelector((state: RootState) => state.limit.limit);

  const handleChange = (event: SelectChangeEvent) => {
    const limit = parseInt(event.target.value);
    dispatch(saveLimit(limit));

  }

  return (
    <FormControlCustomStyles>
     <FormControl sx={{ m: 1, width: 100}}>
        <InputLabel id="demo-multiple-name-label">Кол-во</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={limit.toString()}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
        >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
    </FormControlCustomStyles>
  );
}