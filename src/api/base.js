import axios from "axios";

import { testApartmentsOnly, testContractsOnly } from "./test";

import { ROUTES } from "../utils/constants";
import { TEST_URL } from "../constants/ApiRoutes";

// ----------------------------------------------------

const DELETE = "/delete/";
const FORM_HEADER = {
  "Content-Type": "multipart/form-data",
};

export const baseURL = axios.create({ baseURL: TEST_URL });

//
//  BASE REQUEST TEMPLATES
//

const add = async (route, data) =>
  baseURL.post(route + ROUTES.ADD, data).then((response) => response.data);

/**
 *
 * @param {string} route
 * specify api route
 * @param {string} id
 * specify item's ```id```
 * @param {Object} data
 * specify data to be updated
 * @returns {Promise<Object>}
 */

const update = async (route, id, data) =>
  baseURL
    .post(route + ROUTES.UPDATE + `/${id}`, data)
    .then((response) => response.data);

const _delete = async (route, id) =>
  baseURL.delete(route + ROUTES.DELETE + `/${id}`).then((response) => response);

const search = async (route, query, page = 0, pageSize = 10) =>
  baseURL.get(route + ROUTES.SEARCH, {
    params: {
      q: query,
      page: page,
      pageSize: pageSize,
    },
  });

const importFile = async (route, formData) =>
  baseURL
    .post(route + ROUTES.IMPORT, formData, { headers: FORM_HEADER })
    .then((response) => {
      console.log("FINISH REQUEST");
      console.log(response);
      return response;
    })
    .catch((error) => console.log(error));

export const exportFileAPI = (route, getTemplate = false) => {
  return TEST_URL + route + "/export?getTemplate=" + getTemplate;
};

export const BASE = {
  add: add,
  delete: _delete,
  update: update,
  import: importFile,
};
