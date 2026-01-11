// models/create-customer.dto.ts
export interface CreateCustomerDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  genderId: number;
}
