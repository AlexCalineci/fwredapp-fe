export interface FeedbackRating {
  reservationId: number|undefined,
  ratedOrgId:number|undefined,
  rateDate:string,
  starRating:number,
  reservationDetails:string,
  raterOrgId:number|undefined,
  raterOrgType:number,
  ratedOrgType:string
  ratedOrganizationName:string,
  raterOrganizationName:string,
  feedbackId:number
}
