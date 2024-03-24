import axios from "axios";

import {
  testApartments,
  testApartmentsOnly,
  testContracts,
  testContractsOnly,
} from "./test";

import { TEST_URL, API_ROUTE_APARMENT } from "../utils/constants";

export const fetchApartmentsAPI = async () =>
  axios
    .get(TEST_URL + API_ROUTE_APARMENT)
    .then((response) => response.data.data)
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

export const addApartmentsAPI = async (formData) => {
  console.log("SUBMIT FILES");
  axios
    .postForm(TEST_URL + API_ROUTE_APARMENT, formData)
    .then((response) => console.log(response))
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

export const fetchTestApartment = testApartmentsOnly;
export const fetchTestContract = testContractsOnly;
