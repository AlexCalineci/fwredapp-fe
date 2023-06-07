export interface Registration {
  userName: string
  userTypeId?:number|null,
  email:string,
  connectionSecureString:string,
  organizationName:string,
  description:string,
  contactPerson:string,
  contactEmail:string,
  contactPhone:string,
  legalDetails:string
  fic:string
}
