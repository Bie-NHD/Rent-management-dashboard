interface IUser {
  id: string;
  email: string;
  username: string;
  fullName: string | null;
  createDate: string;
  active: boolean;
  role: string;
}
