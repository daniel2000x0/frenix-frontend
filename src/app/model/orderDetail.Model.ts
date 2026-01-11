export interface OrderDetail {
  productid: number;
  quantity: number;
  unitprice: number;
  discount?: number;
  total: number;
}
