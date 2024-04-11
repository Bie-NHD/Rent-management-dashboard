import { object, string, number, date, InferType } from "yup";
import IApartment from "./IApartment";

let ApartmentSchema = object<IApartment>({
  address: string().label("Address").required().default(""),
  numberOfRoom: number().label("Number of Rooms").min(1).required().default(1),
  retailPrice: number()
    .label("Retail Price")
    .min(100000)
    .required()
    .default(100000),
});

export default ApartmentSchema;
