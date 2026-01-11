import { OrderDetailDto } from "./orderDetails.dto";


export interface CreateOrderDto {
  customerid: number;
  customercountry: number;

  customername: string;
  customercity: string;
  customerregion: string;
  customerzip: string;
  customeraddress: string;
  customerphone: string;

  orderDetails: OrderDetailDto[];
}
