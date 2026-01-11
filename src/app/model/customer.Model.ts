export interface Customer {
  customerid: number;
  customerfirstname: string;
  customerlastname: string;
  customeremail: string;
  cutomerpassword:string;
  customerbithdate:Date;
  customergender: number;
}
export interface RespCustomer{
  customer:Customer ; 
  mensaje: string;
}
