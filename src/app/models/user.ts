export interface IUser {
  createdAt: string;
  username: string;
  _id: string;
  picture: string;
  logged_in: boolean;
}
export interface IUserSignin {
  username: string;
  password: string;
}
export interface IUserSignup {
  username: string;
  password: string;
  passwordC: string;
}

export interface IUserResponse {
  user: IUser;
  error: {
    name: string;
    message: string;
  };
}
