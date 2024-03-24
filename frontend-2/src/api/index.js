import axios from "axios";

import {
  testApartments,
  testApartmentsOnly,
  testContracts,
  testContractsOnly,
} from "./test";

import { TEST_URL, API_ROUTE_APARMENT } from "../utils/constants";

export const fetchApartmentsAPI = async (page, pageSize) =>
  axios
    .get(TEST_URL + API_ROUTE_APARMENT, { page, pageSize })
    .then((response) => {
      console.log(response.data.data);
      return response.data.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

export const importApartmentsAPI = async (formData) => {
  console.log("SUBMIT FILES");
  console.log(formData);
  axios
    .post(TEST_URL + API_ROUTE_APARMENT + "/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => console.log(response))
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

export const exportFileAPI = (route, getTemplate = false) => {
  return TEST_URL + route + "/export?getTemplate=" + getTemplate;
};

export const fetchTestApartment = testApartmentsOnly;
export const fetchTestContract = testContractsOnly;
