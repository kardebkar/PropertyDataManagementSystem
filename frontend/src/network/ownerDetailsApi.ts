import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { User } from "../models/user";
import { IOwnerDetailsInputModel, IOwnerDetailsViewModel } from "../models/ownerDetails";


async function apiCall(input: RequestInfo, init?: RequestInit){
    const response = await fetch(input, init);
    if(response.ok){
        return response;
    }
    else{
        const errorBody=await response.json();
        const errorMessage=errorBody.error;

        if(response.status===401){
            throw new UnauthorizedError(errorMessage);
        }
        else if(response.status===409){
            throw new ConflictError(errorMessage);
        }
        else{
            throw Error("Request failed with status: "+response.status+" message: "+errorMessage);
        }

    }
}

//GetAllOwnerDetails
export async function getAllOwnerDetails():Promise<IOwnerDetailsViewModel[]>{
    const response=await apiCall("/api/ownerDetails/all",{method:"GET"});
    const ownerDetails=await response.json();
    return ownerDetails;
}

//GetOneOwnerDetails
export async function getOneOwnerDetails(ownerId:string):Promise<IOwnerDetailsViewModel>{
    const response=await apiCall("/api/ownerDetails/"+ownerId,{method:"GET"});
    const ownerDetails=await response.json();
    return ownerDetails;
}

//CreateOwnerDetails
export async function createOwnerDetails(ownerDetails:IOwnerDetailsInputModel):Promise<IOwnerDetailsViewModel>{
    const response=await apiCall("/api/ownerDetails",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(ownerDetails)
    });
    const createdOwnerDetails=await response.json();
    return createdOwnerDetails;
}

//UpdateOwnerDetails
export async function updateOwnerDetails(ownerId:string,ownerDetails:IOwnerDetailsInputModel):Promise<IOwnerDetailsViewModel>{
    const response=await apiCall("/api/ownerDetails/"+ownerId,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(ownerDetails)
    });
    const updatedOwnerDetails=await response.json();
    return updatedOwnerDetails;
}

//DeleteOwnerDetails
export async function deleteOwnerDetails(ownerId:string){
    await apiCall("/api/ownerDetails/"+ownerId,{method:"DELETE"});
}



















