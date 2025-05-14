// import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PaginationStyles } from './Pagination.styles';
import ItemsPerPage from './ItemsPerPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useEffect, useState } from 'react';
import { savePage } from '../../../store/pageSlice';
import { setTasks } from '../../../store/tasksSlice';
import { fetchTodos } from '../../api/todos';


export function PaginationTodo () {
  const page = useSelector((state: RootState) => state.page.page)
  const limit = useSelector((state: RootState) => state.limit.limit)
  const dispatch = useDispatch();
  
  
  const [totalTasks, setTotalTasks] = useState(0);

  const totalPages = Math.ceil(totalTasks / limit);

  useEffect(() => {
        const loadTodos = async () => {
            try {
                const data = await fetchTodos(page, limit);
                dispatch(setTasks(data.data));
                setTotalTasks(data.total)
            } catch (error) {
                console.error('Ошибка при загрузке задач:', error);
            }
        };
        loadTodos();
    }, [page, limit, dispatch]);

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