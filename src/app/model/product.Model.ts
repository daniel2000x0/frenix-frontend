export interface Product {
  serial: number;
  productid: string;
  productsku: string;
  productname: string;

  productprice: number;
  productdiscount: number;
  productquantity: number;

  productmanufacture: number;
  productcategory: number;
  productuser: number;

  productdescription?: string | null;
  productview: number;
}
