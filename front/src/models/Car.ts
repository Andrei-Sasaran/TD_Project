import { BookingDetails } from "./BookingDetails";

export interface Car{
    id : number;
    model : string;
    brand : string;
    color : string;
    year_manufacture : number;
    nrkilometers : number;
    description : string;
    bookingDetailsSet:BookingDetails[];
}