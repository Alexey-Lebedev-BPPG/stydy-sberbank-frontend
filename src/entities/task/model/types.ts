export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface CreateTask extends Omit<Task, 'id'> {
  id?: string;
}
