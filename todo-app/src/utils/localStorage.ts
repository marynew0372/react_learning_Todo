const TASK_KEY = 'tasks';

interface Task {
    text: string;
    date: Date;
    checkbox: boolean;
}

export enum ThemeModeEnum {
    darkTheme = 'dark',
    lightTheme = 'light'
}

export const saveTasksToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
};

export const loadTasksFromLocalStorage = (): Task[] => {
    const storedTasks = localStorage.getItem(TASK_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
};

export const clearTasksFromLocalStorage = () => {
    localStorage.removeItem(TASK_KEY);
};

export const saveThemeToLocalStorage = (theme: 'light' | 'dark') => {
    localStorage.setItem('Theme', theme);
};

export const loadThemeFromLocalStorage = (): 'light' | 'dark' => {
    const storedTheme = localStorage.getItem('Theme');
    return storedTheme === 'dark' ? 'dark' : 'light'; // Возвращаем 'light' по умолчанию
};