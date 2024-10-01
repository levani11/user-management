export enum Gender {
  Male = "male",
  Female = "female",
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  phone: string;
  address: string;
  privateNumber: string,
  legalAddressCountry: string;
  legalAddressCity: string;
  legalAddressStreet: string;
  factualAddressCountry: string,
  factualAddressCity: string;
  factualAddressStreet: string;
  image?: string | undefined;
}
