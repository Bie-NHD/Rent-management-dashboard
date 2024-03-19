export const testApartments = {
  page: {
    pageNumber: 0,
    pageSize: 10,
    offset: 0,
    numberOfElements: 2,
    totalElements: 2,
    totalPages: 1,
    sorted: true,
    first: true,
    last: true,
    empty: false,
  },
  apartments: [
    {
      id: "7ad5f9e3-5ea7-4c29-bde8-48c1a0209e3f",
      address: "Dong Nai",
      retailPrice: "3,500,000",
      numberOfRoom: 10,
    },
    {
      id: "74299496-e648-4e5e-804c-c4016e5dca44",
      address: "Sai Gon",
      retailPrice: "345",
      numberOfRoom: 4,
    },
  ],
};

export const testApartmentsOnly = testApartments.apartments;

export const testContracts = {
  page: {
    pageNumber: 0,
    pageSize: 10,
    offset: 0,
    numberOfElements: 1,
    totalElements: 1,
    totalPages: 1,
    sorted: true,
    first: true,
    last: true,
    empty: false,
  },
  contracts: [
    {
      id: "f5744bc3-4ee8-4633-b43e-d5fd1f77e3d0",
      startDate: [2024, 1, 3],
      endDate: [2024, 1, 9],
      customer: {
        id: "0089852b-175c-494f-bb84-bbaa9001812c",
        firstName: "Kiet",
        lastName: "Hoang",
        address: "Dong Nai",
        age: 21,
        status: "Normal",
      },
      apartment: {
        id: "74299496-e648-4e5e-804c-c4016e5dca44",
        address: "Sai Gon",
        retailPrice: "345",
        numberOfRoom: 4,
      },
    },
  ],
};
export const testContractsOnly = testContracts.contracts;
