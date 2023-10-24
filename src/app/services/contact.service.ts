import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IContact } from '../models/IContact';
import { IGroup } from '../models/IGroup';
import { group } from '@angular/animations';
@Injectable({
  providedIn: 'root'
})
export class ContactService {


  private  serverUrl:string = `http://localhost:9000`; //json-server URL
  constructor(private httpClient:HttpClient) {  }

//GET All Contacts
  public getAllContacts():Observable<IContact[]> {
    let dataURL:string = `${this.serverUrl}/contacts`;
    return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handleError));
  }

//Get Single Contact

public getContact(contactId:string):Observable<IContact> {
  let dataURL:string = `${this.serverUrl}/contacts/${contactId}`;
  return this.httpClient.get<IContact>(dataURL).pipe(catchError(this.handleError));
}


//Create New Contact

public CreateContact(contact:IContact):Observable<IContact> {
  let dataURL:string = `${this.serverUrl}/contacts`;
  return this.httpClient.post<IContact>(dataURL,contact).pipe(catchError(this.handleError));
}

//Update a Contact

public UpdateContact(contact:IContact , contactId:string):Observable<IContact> {
  let dataURL:string = `${this.serverUrl}/contacts/${contactId}`;
  return this.httpClient.put<IContact>(dataURL,contact).pipe(catchError(this.handleError));
}

//delete a Contact

public DeleteContact(contactId:string):Observable<{}> {
  let dataURL:string = `${this.serverUrl}/contacts/${contactId}`;
  return this.httpClient.delete<IContact>(dataURL).pipe(catchError(this.handleError));
}



//GET All Groups
public getAllGroups():Observable<IGroup[]> {
  let dataURL:string = `${this.serverUrl}/groups`;
  return this.httpClient.get<IGroup[]>(dataURL).pipe(catchError(this.handleError));
}

//Get Single Group

public getGroup(Contact:IContact):Observable<IGroup> {
let dataURL:string = `${this.serverUrl}/groups/${Contact.groupId}`;
return this.httpClient.get<IGroup>(dataURL).pipe(catchError(this.handleError));
}



//------------------------


  //Error handlling
  public handleError(error:HttpErrorResponse){

let errorMessage:string = '';
if(error.error instanceof ErrorEvent){
  //client Error
  errorMessage = `Error : ${error.error.message}`
}

else{

  //server error

  errorMessage = `status : ${error.status} \n Message: ${error.message}`;
}

return throwError(errorMessage)
  }

}
