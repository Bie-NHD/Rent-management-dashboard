import { Api } from "../api";
import { ApiRoutes } from "../constants";

export const customerLoader = async ({ params }) => {
  const customer = await Api.instance
    .get(`${ApiRoutes.customer.GetAll}/${params?.id}`)
    .then((res) => res.data?.data);
  return customer;
};
