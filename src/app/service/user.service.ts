import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
  })

export class UserService {

    private sharedData: any;

    getSharedData(): any {
      return this.sharedData;
    }
  
    setSharedData(data: any): void {
      this.sharedData = data;
    }

}