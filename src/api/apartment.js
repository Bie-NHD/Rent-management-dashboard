import axios from "axios";

import { testApartmentsOnly, testContractsOnly } from "./test";

import { ROUTES } from "../utils/constants";

import { BASE } from "./_base.js";

//
// APARTMENT REQUESTS
//
const fetchApartmentsAPI = async (page, pageSize) =>
  baseURL
    .get(ROUTES.APARTMENT, {
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

export const importApartmentsAPI = async (formData) =>
  BASE.import(ROUTES.APARTMENT, formData);

const addAparmentAPI = async (apartmentDTO) =>
  BASE.add(ROUTES.APARTMENT, apartmentDTO);

const updateApartmentsAPI = async (apartmentDTO, id) =>
  BASE.update(ROUTES.APARTMENT, id, apartmentDTO);

const deleteApartmentAPI = async (id) => BASE.delete(ROUTES.APARTMENT, id);

//
// CONTRACTS REQUESTS
//
export const importContractsAPI = async (formData) =>
  BASE.import(ROUTES.CONTRACT, formData);

export const addContractsAPI = async (contractDTO) =>
  BASE.add(ROUTES.CONTRACT, contractDTO);

export const updateContractsAPI = async (contractDTO, id) =>
  BASE.update(ROUTES.CONTRACT, id, contractDTO);

export const deleteContractAPI = async (id) => BASE.delete(ROUTES.CONTRACT, id);

export const fetchTestApartment = testApartmentsOnly;
export const fetchTestContract = testContractsOnly;

export const APARTMENT_API = {
  import: importApartmentsAPI,
  fetch: fetchApartmentsAPI,
  add: addAparmentAPI,
  update: updateApartmentsAPI,
  delete: deleteApartmentAPI,
};

export const exportFileAPI = (route, getTemplate = false) => {
  return TEST_URL + route + "/export?getTemplate=" + getTemplate;
};
