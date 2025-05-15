import { fetchTasksStart, setTasks } from '../store/tasksSlice';
import { AppDispatch } from './store';
import { fetchTodos } from '../src/api/todos';


export const fetchTasks = (page = 1, limit = 10) => {
    return async (dispatch: AppDispatch) => {
        dispatch(fetchTasksStart());
        try {
            const data = await fetchTodos(page, limit);
            // const parsedTasks = data.data.map((task: Task) => {
            //     const parsedDate = parse(task.createdAt, 'dd.MM.yyyy, HH:mm:ss', new Date());
            //     const isoDate = formatISO(parsedDate);
            //     return {
            //         ...task,
            //         createdAt: isoDate,
            //     };
            // })
            dispatch(setTasks(data.data))
        }
        catch (error) {
            console.error(`Произошла ошибка при запросе к серверу:`, error);
        }
    }
}