export interface IOwnerDetailsViewModel{
    _id:string;
    userId: string;
    ownerName:string;
    ownerMobileNo:string;
    ownerEmail:string;
    ownerWebsite:string;
    createdAt:Date;
    updatedAt:Date;
}

export interface IOwnerDetailsInputModel{
    userId: string;
    ownerName?:string;
    ownerMobileNo?:string;
    ownerEmail?:string;
    ownerWebsite?:string;
}
