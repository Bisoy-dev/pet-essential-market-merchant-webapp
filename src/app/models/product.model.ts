import { Address } from "./merchan.model";

export class DateCreate {
  createdAt : Date
}

export class CreateProduct {
  accountId : string;
  title : string;
  description : string
  images : string[]
  price : number;
  availability : boolean
  date : DateCreate
  address : Address
}

export class Product {
  _id : string
  accountId : string;
  title : string;
  description : string
  images : string[]
  price : number;
  availability : boolean
  date : DateCreate
  address : Address
  __v : number
}

export class BasicProduct {
  constructor(public product : Product, public isUpdate :  boolean = false){}
}
