import { MaterialReactTable, useMaterialReactTable } from "material-react-table";

import React from 'react'
import TApartment from "../../models/TApartment";

type Props = {
    data:Array<TApartment>;
}

const ApartmentTable = (props:Props) => {
  return (
    <div>ApartmentTable</div>
  );
}

export default ApartmentTable