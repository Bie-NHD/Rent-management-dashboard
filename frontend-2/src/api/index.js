import axios from "axios";

import { testApartmentsOnly, testContractsOnly } from "./test";

import {
  TEST_URL,
  API_ROUTE_APARMENT,
  API_ROUTE_CONTRACT,
} from "../utils/constants";
import { routes } from "react-micro-router";

//
//  REQUEST ACTION ROUTES
//

const ADD = "/add";
const DELETE = "/delete/";
const IMPORT = "/import";
const SEARCH = "/search";
const FORM_HEADER = {
  "Content-Type": "multipart/form-data",
};

export const baseURL = axios.create({ baseURL: TEST_URL });

//
//  BASE REQUEST TEMPLATES
//

const baseRequestAddAPI = async (route, data) =>
  baseURL.post(route + ADD, data).then((response) => response.status);

const baseRequestDeleteAPI = async (route, id) =>
  baseURL
    .post(route + DELETE, {
      params: {
        id: id,
      },
    })
    .then((response) => response);

const baseRequestSearchAPI = async (route, query, page = 0, pageSize = 10) =>
  baseURL.get(route + SEARCH, {
    params: {
      q: query,
      page: page,
      pageSize: pageSize,
    },
  });

const baseRequestImportFileAPI = async (route, formData) =>
  baseURL
    .post(route + IMPORT, formData, { headers: FORM_HEADER })
    .then((response) => response.status);

export const exportFileAPI = (route, getTemplate = false) => {
  return TEST_URL + route + "/export?getTemplate=" + getTemplate;
};

//
// APARTMENT REQUESTS
//

export const fetchApartmentsAPI = async (page, pageSize) =>
  baseURL
    .get(API_ROUTE_APARMENT, {
      params: {
        page: page,
        pageSize: pageSize,
      },
    })
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
  baseRequestImportFileAPI(API_ROUTE_APARMENT, formData).catch((error) =>
    console.log(error)
  );
};

export const addAparmentAPI = async (apartmentDTO) =>
  baseRequestAddAPI(API_ROUTE_APARMENT, apartmentDTO);

export const deleteApartmentAPI = async (id) =>
  baseRequestDeleteAPI(API_ROUTE_APARMENT, id);

//
// APARTMENT REQUESTS
//

export const deleteContractAPI = async (id) =>
  baseRequestDeleteAPI(API_ROUTE_CONTRACT, id);

export const fetchTestApartment = testApartmentsOnly;
export const fetchTestContract = testContractsOnly;
