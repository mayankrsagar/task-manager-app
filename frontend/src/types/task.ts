export interface Task {
  id: string;                             // virtual “id” (string form of _id)
  title: string;
  description: string;
  status: 'TODO' | 'DONE';
  deadline: Date;
  linkedFile?: {
    data: Buffer;                         // PDF binary
    contentType: 'application/pdf';
  };
  hasFile: boolean;                       // virtual from your schema
  createdAt: Date;
  updatedAt: Date;
}
export type TaskUpdate = Partial<{
  title: string;
  description: string;
  status: 'TODO' | 'DONE';
  deadline: Date;
  linkedFile: {
    data: string;
    contentType: 'application/pdf';
  };
}>;

export interface TaskCreate {
  title: string;
  description: string;
  deadline: Date;
  status?:'TODO' | 'DONE';
  linkedFile?: {
    data: string;
    contentType: 'application/pdf';
  };
}
