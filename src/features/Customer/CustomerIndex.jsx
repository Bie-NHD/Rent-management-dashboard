import React, { useState, useEffect } from "react";

import { TableCell } from "@mui/material";
import { formatId } from "../../utils/stringFormats";

const CustomerIndex = () => {
  const [apartments, setApartments] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // useEffect(() => {
  //   api.fetch().then((data) => setApartments(data.apartments));
  // }, []);

  return (
    <ul>
      {/* {apartments.map((item) => (
        <li
          key={item.id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <p>{formatId(item.id)}</p>
          <p>{item.address}</p>
          <p>{item.retailPrice}</p>
          <p>{item.numberOfRoom}</p>
        </li>
      ))} */}
    </ul>
  );
};
export default CustomerIndex;
