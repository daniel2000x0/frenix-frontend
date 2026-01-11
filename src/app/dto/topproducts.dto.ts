export interface ProductImageDto {
  id: number;
  url: string;
}

export interface TopProductDto {
  productid: number;
  productname: string;
  productmanufacture: number;
  productcategory: number;
  productdescription: string;

  numveces: string; // o number (ver nota abajo)
  ranked: string;   // o number

  imagenes: ProductImageDto[];
}
