import { Address } from "./Address";
import { BookingDetails } from "./BookingDetails";

export interface Clients{
    id : number;
    phoneNR : string;
    email_address : string;
    dateOfBirth : string;
    lname :string;
    fname : string;
    addressID : Address;
    noBookings:number;
    address?:Address;
    bookingDetailsSet:BookingDetails[];
}