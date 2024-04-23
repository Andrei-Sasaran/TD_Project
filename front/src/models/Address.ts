import { Clients } from "./Client";
import { ClientsDTO } from "./ClientsDTO";

export interface Address{
    address_id : number;
    country : string;
    county : string;
    city : string;
    additional_info : string;
    clientList:ClientsDTO[];
}