import { Task } from "../model/task.model";

class TaskService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  addTask(title: string, description: string): void {
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      createdAt: timeString,
    };
    
    this.tasks = [newTask, ...this.tasks];
  }

  updateTask(id: string, title: string, description: string): void {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], title, description };
    }
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}

export default new TaskService();