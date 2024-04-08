export class Apartment {
  id: string;
  address: string;
  retailPrice: string;
  numberOfRoom: number;

  constructor(
    id: string,
    address: string,
    retailPrice: string,
    numberOfRoom: number
  ) {
    this.id = id;
    this.address = address;
    this.retailPrice = retailPrice;
    this.numberOfRoom = numberOfRoom;
  }

  static fromJsonObj = (jsonObj: {
    id: string;
    address: string;
    retailPrice: string;
    numberOfRoom: number;
  }): Apartment =>
    new Apartment(
      jsonObj.id,
      jsonObj.address,
      jsonObj.retailPrice,
      jsonObj.numberOfRoom
    );
}
