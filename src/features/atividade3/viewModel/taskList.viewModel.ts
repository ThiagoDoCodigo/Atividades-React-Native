import { useState, useEffect } from 'react';
import { Task } from '../model/task.model';
import taskService from '../service/task.service';

export class TaskListViewModel {
  private _tasks: Task[] = [];
  private setTasksCallback: ((tasks: Task[]) => void) | null = null;

  get tasks(): Task[] {
    return this._tasks;
  }

  setTasksListener(callback: (tasks: Task[]) => void) {
    this.setTasksCallback = callback;
  }

  loadTasks(): void {
    this._tasks = [...taskService.getAllTasks()];
    this.setTasksCallback?.(this._tasks);
  }
}

export const useTaskListViewModel = () => {
  const [viewModel] = useState(() => new TaskListViewModel());
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    viewModel.setTasksListener(setTasks);
  }, [viewModel]);

  return { viewModel, tasks };
};