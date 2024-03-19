

import axios from "axios";

import {testApartments,testApartmentsOnly,testContracts, testContractsOnly} from "./test"

const URL = "http://localhost:9090";

export const fetchApartmentsAPI = async () =>
  axios
    .get(URL + "/apartments")
    .then((response) => response.data.data)
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

  const addApartmentsAPI = async (formData)=>{
  
  
  axios.postForm(URL + "/apartments",formData)
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  }

export const fetchTestApartment = testApartmentsOnly;
export const fetchTestContract = testContractsOnly;