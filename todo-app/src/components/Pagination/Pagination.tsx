// import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PaginationStyles } from './Pagination.styles';
import ItemsPerPage from './ItemsPerPage';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useEffect } from 'react';
import { savePage } from '../../../store/pageSlice';
import { fetchTaskThunk, fetchTotalValueTaskThunk } from '../../../store/tasksThunks';
import { useAppDispatch } from '../../../store/hooks';


export function PaginationTodo () {
  const page = useSelector((state: RootState) => state.page.page)
  const limit = useSelector((state: RootState) => state.limit.limit)
  const total = useSelector((state: RootState) => state.total.total)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTaskThunk({page, limit}))
    dispatch(fetchTotalValueTaskThunk({page, limit}))
  }, [page, limit, dispatch, total]);

    const totalPages = Math.ceil(total / limit);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
        dispatch(savePage(newPage)); 
    };

  return (
    <>
      <PaginationStyles spacing={2}>
        <Pagination
          page={page}
          count={totalPages}
          onChange={handlePageChange}
          color='secondary'
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      <ItemsPerPage />
      </PaginationStyles>
    </>
  );
}