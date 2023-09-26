import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'
    constructor(private http : HttpClient) {}

    registerUser(userData: any) {
      return this.http.post(`${this.apiUrl}/register`, userData).pipe(
        catchError(error => {
          console.error('Observable error:', error);
          throw error;
        })
      )
    }
    // register(user: any): Observable<any> {
    //   const url = `${this.apiUrl}/register`;
    //   return this.http.post(url, user);
    // }
    
    login(credentials: { email: string; password: string }): Observable<any> {
      const url = `${this.apiUrl}/login`;
      return this.http.post(url, credentials);
    }
  
}
