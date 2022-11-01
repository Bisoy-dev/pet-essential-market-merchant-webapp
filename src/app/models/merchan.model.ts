export class Contact {
  email : string;
  number : number
}
export class Coordinates {
  latitude : string = '';
  longitude : string = '';
}
export class Address {
  name : string = '';
  coordinates : Coordinates
}

export class CreateMerchant {
  accountId : string
  avatar : string
  banner : string
  name : string
  address : Address;
  contact : Contact;
  visibility : boolean = true;
  verified : boolean = true;
  serviceHrs : string = '8:00AM - 9:00PM';
  riderStatus :string;
  feePerKilometer : number = 10
}

export class Merchant {
  accountId : string
  avatar : string
  banner : string
  name : string
  address : Address;
  contact : Contact;
  visibility : boolean = false;
  verified : boolean = false;
  serviceHrs : string = '8:00AM - 9:00PM';
  riderStatus :string;
  feePerKilometer : number = 10
  role : string
}
