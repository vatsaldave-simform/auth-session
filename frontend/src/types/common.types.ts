export type User = {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ApiResponse<T> = {
  status: string;
  data: T;
};
