import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {ListingService} from '../shared/listing.service'
import { Listing } from '../shared/listing.model';
//  import {listingss} from '../shared/listing.model';
import { from } from 'rxjs';

declare var M: any;

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
  providers:[ListingService]
})
export class ListingComponent implements OnInit {

  constructor(public listingService: ListingService) { }

  ngOnInit(): void {
    this.resetForm();// resetform function called here.
    this.refreshList(); //refresh function callesd here to get data.
  }

  //That is reset function to clear the form info.and its called in .html file using click event. 
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.listingService.selectList = {
      _id: "",
      name: "",
      last: "",
      email: "",
      number: null
    }
  }
  fileToUpload: File = null;
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  // submit the form using onsubmit function.(storing all inputs into db.)
  onSubmit(form : NgForm){
    if(this.fileToUpload){
    if (form.value._id == "") {
      const formData: FormData = new FormData();
      formData.append('name', form.value.name);
      formData.append('last', form.value.last);
      formData.append('email', form.value.email);
      formData.append('number', form.value.number);
      formData.append('file', this.fileToUpload);
    this.listingService.postListing(formData).subscribe((res) =>{});
    this.resetForm(form);
    this.refreshList();
    M.toast({ html: 'Saved successfully', classes: 'rounded' 
  });
}
else{
  this.listingService.putListing(form.value).subscribe((res) =>{});
  this.resetForm(form);
  this.refreshList();
  M.toast({ html: 'Updated successfully', classes: 'rounded' 
});
}
    }else{
      M.toast({ html: 'Select a image', classes: 'rounded' 
    });
    }
}

// refreshlist is a function for get list of array from db. array is define in service.ts file
refreshList(){
  this.listingService.getListing().subscribe((res) =>{
    this.listingService.listings = res as Listing[];
  });
}

onEdit(lis: Listing) {
  this.listingService.selectList = lis;
}

onDelete(_id: string, form: NgForm) {
  if (confirm('Are you sure to delete this record ?') == true) {
    this.listingService.deleteListing(_id).subscribe((res) => {
      this.refreshList();
      this.resetForm(form);
      M.toast({ html: 'Deleted successfully', classes: 'rounded' });
    });
  }
}

}