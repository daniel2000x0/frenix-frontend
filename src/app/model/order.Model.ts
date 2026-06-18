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
  status?: string;
  details: OrderDetail[];
}

export interface OrderDetail {
  productid: number;
  quantity: number;
  unitprice: number;
  discount?: number;
  total?: number;
}
