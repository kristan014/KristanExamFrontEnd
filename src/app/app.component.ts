import { Component } from '@angular/core';
import { RESTAPIServiceService } from "src/app/restapiservice.service";
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-exam';

  userLists: any;
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  email: string = '';
  mobileNumber: string = '';




  constructor(private apiService: RESTAPIServiceService, private userService: UserService) { }
  

  // to display the data on load
  ngOnInit(): void {
    this.apiService.getUsers().subscribe(
      (data: any) => {
        // Pass the data to your own service
        this.userService.setSharedData(data);
        this.userLists = data
        console.log(data)
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }



  // edit the user
  editUser(id: number){
    this.apiService.getUserById(id).subscribe(
      (data: any) => {
        // Pass the data to your own service
        this.userService.setSharedData(data);
        this.firstName = data.firstName
        this.middleName = data.middleName
        this.lastName = data.lastName
        this.email = data.email
        this.mobileNumber = data.mobileNUmber

        console.log(data)
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // delete the user
  deleteUser(id: number){
    this.apiService.deleteUser(id).subscribe(
      (data: any) => {
        // Pass the data to your own service
        alert("User Deleted Successfully")
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }




}
