export interface ITask {
  _id: string;
  owner: string;
  date: Date;
  created_at: Date;
  updated_at: Date;
  title: string;
  description?: string;
}
