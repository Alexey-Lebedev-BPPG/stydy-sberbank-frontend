export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface CreateTask extends Omit<Task, 'id'> {
  id?: string;
}

export interface ITaskServer extends Omit<Task, 'id'> {
  userId: number;
  id: number;
}

export interface CreateServerTask extends Omit<ITaskServer, 'id'> {
  id?: number;
}
