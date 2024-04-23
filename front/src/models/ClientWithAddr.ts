import { Address } from "./Address";

export interface ClientWithAddr{
    idClient : number;
    phoneNR : string;
    email_address : string;
    dateOfBirth : string;
    lname :string;
    fname : string;
    address : Address;
    
}