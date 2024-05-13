import { UserRoutes } from "../constants";
import privateInstance from "./privateInstance";

const getUserDetails = () =>
  privateInstance
    .get<TApiResponse<IUser>>(UserRoutes.details)
    .then((res) => res.data.data);

const UserApi = Object.freeze({
  details: getUserDetails,
} as const);

export default UserApi;
