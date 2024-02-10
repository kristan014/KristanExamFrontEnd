import { Component, ViewChild } from '@angular/core';
import { UserService } from "src/app/services/user.service";
import { AlertDialogComponent } from './utils/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-exam';

  @ViewChild('myForm') myForm!: NgForm;

  userLists: any;
  id: string = '';
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  email: string = '';
  mobileNumber: string = '';

  constructor(private userService: UserService
    , private dialog: MatDialog
  ) { }


  // to display the data on load
  ngOnInit(): void {
    this.loadUsers();
  }

  // load users
  loadUsers() {
    this.userService.getUsers().subscribe(
      {
        next: (data: any) => {
          this.userLists = data
        },
        error: (error: any) => {
          console.error('Error fetching data:', error);
        },
        // complete: () => console.info('complete')
      }
    );
  }


  // submit
  submitData() {
    const data: any = {
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      email: this.email,
      mobileNumber: this.mobileNumber
    };

    //create
    if (this.id == "" || this.id == null) {
      this.userService.addUser(data).subscribe({
        next: (response) => {
          if (response.statusCode == "200") {
            this.loadAlert("Added", response.successResponse);
            // Reset the form
            this.myForm.resetForm();
          } else {
            this.loadAlert("Error", JSON.stringify(response.errorResponses));
          }
          console.log('API response', response);
        },
        error: (error) => {
          console.error('API error', error);
        },
        complete: () => this.loadUsers()
      })
    }

    // update
    else {
      data["id"] = Number(this.id);

      this.userService.updateUser(data.id, data).subscribe({
        next: (response) => {
          if (response.statusCode == "200") {
            this.loadAlert("Updated", response.successResponse);
            // Reset the form
            this.myForm.resetForm();

          } else {
            this.loadAlert("Error", JSON.stringify(response.errorResponses));
          }

          console.log('API response', response);
        },
        error: (error) => {
          console.error('API error', error);
        },
        complete: () => this.loadUsers()
      })
    }

  }


  // display the selected user from table
  viewUser(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (data: any) => {
        this.id = data.id
        this.firstName = data.firstName
        this.middleName = data.middleName
        this.lastName = data.lastName
        this.email = data.email
        this.mobileNumber = data.mobileNumber

        console.log(data)
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  // delete the user
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (data: any) =>
        this.loadAlert("Deleted", "User Deleted Successfully")
      ,
      error: (error: any) =>
        console.error('Error fetching data:', error),

      complete: () => this.loadUsers()
    });
  }


  //search
  onKeyChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;

    this.userService.getUsers(inputValue).subscribe({
      next: (data: any) => {
        this.userLists = data
      },

      error: (error: any) =>
        console.error('Error fetching data:', error)

    })


  }

  // display alert message
  loadAlert(status: string, message: string): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        title: status,
        message: message,
      },
    });

    // // You can subscribe to the afterClosed event to perform actions after the dialog is closed
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('Dialog closed:', result);
    // });
  }


}
