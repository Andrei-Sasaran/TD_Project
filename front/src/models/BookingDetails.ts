import { Car } from "./Car";
import { Clients } from "./Client";
import { ClientsDTO } from "./ClientsDTO";

// import { Car } from "./Car";
export interface BookingDetails{
    startDate: string;
    returnDate: string;
    amount: number;
    bookingStatus: string;
    drop_loc: string;
    pickup_loc: string;
    clientId: number;
    idBooking: number;
    carId: number;
    car?:Car;
    client?:ClientsDTO;
}