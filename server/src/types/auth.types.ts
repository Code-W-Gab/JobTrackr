export interface IUser {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface loginDTO {
  email: string;
  password: string;
}

export type registerDTO = IUser;

export type updateMeDTO = Partial<Pick<IUser, "fullName">>

export interface IAuthResponse {
  success: boolean;
  data?: IUser;
  message: string;
}

export interface IdParams {
  id: string
}

export interface IUpdatePass {
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string
}