import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RESTAPIServiceService {

  fetchData() {
    throw new Error('Method not implemented.');
  }

  apiUrl = 'http://localhost:8070/api/v1/';

  constructor(private http: HttpClient) { }


  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}users`);
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
