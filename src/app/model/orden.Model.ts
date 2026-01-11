import { OrderDetail } from "./orderDetail.Model";


export interface Order {
  orderid: number;
  customerid: number;
  customercountry: number;

  customername: string;
  customercity: string;
  customerregion: string;
  customerzip: string;
  customeraddress: string;
  customerphone: string;

  total_general: number;
  orderdate: string;

  details: OrderDetail[];
}
