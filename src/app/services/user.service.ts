import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })

export class UserService {

    // private sharedData: any;

    // getSharedData(): any {
    //   return this.sharedData;
    // }
  
    // setSharedData(data: any): void {
    //   this.sharedData = data;
    // }
    apiUrl = 'http://localhost:8070/api/v1/';

    constructor(private http: HttpClient) { }
  
  
    getUsers(name: String | null = null): Observable<any[]> {
      let urlExtension = (name === null || name === "") ? 'users' : `users?name=${name}`;
      return this.http.get<any[]>(`${this.apiUrl}${urlExtension}`);
    }
  
    getUserById(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}users/${id}`);
    }
  
    addUser(User: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}users`, User);
    }
  
    updateUser(id: number, User: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}users/${id}`, User);
    }
  
    deleteUser(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}users/${id}`);
    }
  
}