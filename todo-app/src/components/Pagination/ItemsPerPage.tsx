import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { saveLimit } from '../../../store/limitSlice';
import { RootState } from '../../../store/store';
import { FormControlStyled, InputLabelStyled, OutlinedInputStyled } from './itemsPerPage.styles';

export default function ItemsPerPage() {
  const dispatch = useDispatch();
  const limit = useSelector((state: RootState) => state.limit.limit);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const limit = parseInt(event.target.value);
    dispatch(saveLimit(limit));

  }

  return (
    <FormControlStyled sx={{ m: 1, width: 100}}>
      <InputLabelStyled id="demo-multiple-name-label">Кол-во</InputLabelStyled>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        value={limit.toString()}
        onChange={handleChange}
        input={<OutlinedInputStyled label="Name" />}
      >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
      </Select>
    </FormControlStyled>
  );
}