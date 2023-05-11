import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { User } from "../models/user";

async function fetchData(input: RequestInfo, init?: RequestInit){
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

export async function fetchUsers(): Promise<User[]>{
    const response=await fetchData("/api/users/all",{method:"GET"});
    return response.json();
}


// export interface NoteInput{
//     title: string,
//     text?: string,
// }

// export async function createNote(note: NoteInput):Promise<Note>{
//     const response = await fetchData("/api/notes",{
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json",
//         },
//         body:JSON.stringify(note),
//     });
//     return response.json();
// }


// export async function updateNote(noteId: string, note: NoteInput): Promise<Note>{
//     const response = await fetchData("/api/notes/"+noteId,{
//         method:"PATCH",
//         headers:{
//             "Content-Type":"application/json",
//         },
//         body:JSON.stringify(note),
//     });
//     return response.json();
// }



export async function deleteUser(userId: string){
    await fetchData("/api/users/"+userId, {method: "DELETE"});
}




// export async function getLOggedInUser(): Promise<User>{
//     const response = await fetchData("/api/users",{method: "GET"});
//     return response.json();
// }

// export interface SignUpCredentials{
//     username: string,
//     email: string,
//     password: string,
//     role: string,
//     first_name: string,
//     last_name: string,
//     phone_number: string,
//     address: string,
//     city: string,
//     state: string,
//     zip_code: string,
//     country: string,
//     is_active: boolean,
//     is_verified: boolean,
//     is_deleted: boolean,
//     created_at: Date,
//     updated_at: Date,
//     deleted_at: Date,
//     communication_preferences: string,
    
// }

















