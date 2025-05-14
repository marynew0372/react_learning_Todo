import axios from 'axios';
import { Task } from '../../store/tasksSlice';

const API_URL = 'http://localhost:3001';

export const fetchTodos = async (page: number, limit: number) => {
  const response = await axios.get(`${API_URL}/todos`, {
    params: { page, limit },
  });
  return response.data;
};

export const createTodo = async (text: string) => {
  const response = await axios.post(`${API_URL}/todos/`, { text });
  return response.data;
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`${API_URL}/todos/${id}`, {
    params: { id },
  })
}

export const updateTodo = async (id: number, updated: Partial<Task>): Promise<Task> => {
    const response = await axios.put(`${API_URL}/todos/${id}`, updated);
    return response.data;
};

export const toggleTask = async (id: number): Promise<Task> => {
    const response = await axios.patch(`${API_URL}/todos/${id}/toggle`);
    return response.data;
};
