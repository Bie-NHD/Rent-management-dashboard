import { Api } from "../api";
import { ApiRoutes } from "../constants";

export const customerLoader = async ({ params }) => {
  const customer = await Api.instance
    .get(`${ApiRoutes.customer.GetAll}/${params?.id}`)
    .then((res) => res.data?.data);
  return customer;
};

export const userLoader = async ({ params }) => {
  const user = await Api.instance
    .get(`${ApiRoutes.user.index}/${params?.id}`)
    .then((res) => res.data?.data);
  return user;
};

export const contractLoader = async ({ params }) => {
  const user = await Api.instance
    .get(`${ApiRoutes.contract.GetAll}/${params?.id}`)
    .then((res) => res.data?.data);
  return user;
};

export const apartmentLoader = async ({ params }) => {
  const apartment = await Api.instance
    .get(`${ApiRoutes.apartment.GetAll}/${params?.id}`)
    .then((res) => res.data?.data);
  return apartment;
};
