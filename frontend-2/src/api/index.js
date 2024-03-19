import routes from "../routes";

import axios from "axios";

const URL = "http://localhost:9090";

const fetchApartmentsAPI = async () =>
  await axios
    .get(URL + "/apartments")
    .then((response) => response.data.data)
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

export { fetchApartmentsAPI };
