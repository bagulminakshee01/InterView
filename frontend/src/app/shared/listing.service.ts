import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { * } from 'rxjs/add/operator/map';
// import * from 'rxjs/add/operator/toPromise';

import { Listing } from './listing.model';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  selectList: Listing;
  listings: Listing[];
  readonly baseURL ='http://localhost:3000/listings';

  constructor(private http: HttpClient) {}

  postListing(lis){
    return this.http.post(this.baseURL+'/', lis);
  }

  getListing(){
    return this.http.get(this.baseURL);
  }
  putListing(lis: Listing) {
    return this.http.put(this.baseURL + `/${lis._id}`, lis);
  }

  deleteListing(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
