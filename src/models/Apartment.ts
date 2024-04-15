type TApartmentDTO = {
  address: string;
  numberOfRoom: number;
  retailPrice: number;
};

type TApartment = {
  id: string;
} & TApartmentDTO;
