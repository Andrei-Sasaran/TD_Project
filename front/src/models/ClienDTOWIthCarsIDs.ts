import { Clients } from "./Client";

export interface ClientDTOWIthCarsIds{
    Client:Clients,
    carsIds:Number[],
    addressId:number,
}