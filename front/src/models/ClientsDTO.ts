import { Address } from "./Address";

export interface ClientsDTO{
    idClient : number;
    phoneNR : string;
    email_address : string;
    dateOfBirth : string;
    lname :string;
    fname : string;
    addressID : number;
    noBookings:number;
}