export interface ITask {
  _id: string;
  owner: string;
  date: string;
  created_at: Date;
  updated_at: Date;
  title: string;
  description?: string;
}

export interface ICreateTask {
  title: string;
  description?: string;
  date: string;
}
