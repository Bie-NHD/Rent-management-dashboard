import { UserRoutes } from "../constants";
import privateInstance from "./privateInstance";

export const getUserDetails = () =>
  privateInstance
    .get<ApiResponse<User>>(UserRoutes.details)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error))
    .then((_) => _.data);

const UserApi = Object.freeze({
  details: getUserDetails,
} as const);

export default UserApi;
