import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {

  public contactId: string | null = null;
public loading:boolean =false;
public contact : IContact = {} as IContact;
public errorMessage : string | null = null;
public groups:IGroup[] = [] as IGroup[];

constructor(private ActivatedRoute:ActivatedRoute,
  private contactService :ContactService,
  private router: Router
  ){

}

ngOnInit(): void {
  

  this.loading = true;
  this.ActivatedRoute.paramMap.subscribe((param)=>{

    this.contactId=param.get('contactId');
  });
  if(this.contactId){
    this.loading = true;
    this.contactService.getContact(this.contactId).subscribe((data:IContact)=>{
      this.contact = data;
      this.loading = false;
      this.contactService.getAllGroups().subscribe((data:IGroup[])=>{
        this.groups = data ; 
      })
    },(error)=>{
      this.errorMessage = error;
      this.loading = false;

    })
  }

  
}


 public onSubmitUpdate(){

if(this.contactId){
  this.contactService.UpdateContact(this.contact , this.contactId).subscribe((data:IContact)=>{

    this.router.navigate(['/']).then();
  }, (error)=>{
    this.errorMessage = error;
    this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
  })
}
}


}


