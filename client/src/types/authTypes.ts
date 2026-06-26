export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}

export type LoginType = Pick<IUser, "email" | "password">

export type RegisterType = Omit<IUser, "_id">

export interface ApiResponse<T> {
  success: boolean,
  data: T,
  message: string
}

export interface IUpdatePass {
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string
}