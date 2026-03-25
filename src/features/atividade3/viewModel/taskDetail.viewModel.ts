import { useState, useEffect } from 'react';
import taskService from '../service/task.service';

export class TaskDetailViewModel {
  private _title: string = '';
  private _description: string = '';
  private _error: string = '';
  
  private setTitleCallback: ((title: string) => void) | null = null;
  private setDescriptionCallback: ((desc: string) => void) | null = null;
  private setErrorCallback: ((err: string) => void) | null = null;

  setTitleListener(callback: (title: string) => void) { this.setTitleCallback = callback; }
  setDescriptionListener(callback: (desc: string) => void) { this.setDescriptionCallback = callback; }
  setErrorListener(callback: (err: string) => void) { this.setErrorCallback = callback; }

  loadTask(id?: string): void {
    if (id) {
      const task = taskService.getTaskById(id);
      if (task) {
        this.setTitle(task.title);
        this.setDescription(task.description);
      }
    }
  }

  setTitle(title: string): void {
    this._title = title;
    this.setTitleCallback?.(title);
    if (this._error) this.clearError();
  }

  setDescription(desc: string): void {
    this._description = desc;
    this.setDescriptionCallback?.(desc);
  }

  clearError(): void {
    this._error = '';
    this.setErrorCallback?.('');
  }

  saveTask(id?: string): boolean {
    if (!this._title.trim()) {
      this._error = 'O título da tarefa é obrigatório.';
      this.setErrorCallback?.(this._error);
      return false;
    }

    if (this._title.trim().length < 3) {
      this._error = 'O título da tarefa deve ter pelo menos 3 caracteres.';
      this.setErrorCallback?.(this._error);
      return false;
    }

    if(taskService.getAllTasks().some(t => t.title === this._title.trim()) && !id) {
      this._error = 'Ja existe uma tarefa com o mesmo título.';
      this.setErrorCallback?.(this._error);
      return false;
    }

    if(taskService.getAllTasks().some(t => t.title === this._title.trim()) && id && taskService.getTaskById(id)?.title !== this._title.trim()) {
      this._error = 'Ja existe uma tarefa com o mesmo título.';
      this.setErrorCallback?.(this._error);
      return false;
    }

    if (id) {
      taskService.updateTask(id, this._title.trim(), this._description.trim());
    } else {
      taskService.addTask(this._title.trim(), this._description.trim());
    }
    return true;
  }

  deleteTask(id: string): void {
    taskService.deleteTask(id);
  }
}

export const useTaskDetailViewModel = () => {
  const [viewModel] = useState(() => new TaskDetailViewModel());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    viewModel.setTitleListener(setTitle);
    viewModel.setDescriptionListener(setDescription);
    viewModel.setErrorListener(setError);
  }, [viewModel]);

  return { viewModel, title, description, error };
};