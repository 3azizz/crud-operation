import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.scss']
})
export class ContactManagerComponent  implements OnInit{


  public loading:boolean= false;
  public contacts : IContact[]=[];
  public errorMessage: string|null=null;


  constructor(private contactService: ContactService){

  }

  ngOnInit(): void {

    this.getAllContactsFromServer()
  }

  public getAllContactsFromServer(){
    this.loading = true;
    this.contactService.getAllContacts().subscribe((data:IContact[])=>{
      this.contacts = data;
      console.log(data);
      
      this.loading = false;
    },(error)=>{
      this.errorMessage =error;
      this.loading = false;
    });
  }
  public clickDeleteContact(contactId : string| undefined){
    if(contactId){

      this.contactService.DeleteContact(contactId).subscribe((data:{})=>{

        this.getAllContactsFromServer()
      }, (error)=>{
        this.errorMessage =error;
      })
    }
  }
}
