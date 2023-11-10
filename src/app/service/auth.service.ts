import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpRequest: HttpClient) { }

  apiUrl = environment.apiUrl + "/api/login";

  apiUrlLogout = environment.apiUrl + "/api/logout";
  //login
  doLogin(request: any) {
    return this.httpRequest.post(this.apiUrl, request);
  }

  //logout
  logout() {
    const options = {
      headers: new HttpHeaders().append("Authorization", "Bearer " + this.getToken()),
    }
    return this.httpRequest.post(this.apiUrlLogout, {}, options);
  }

  getToken() {
    // Lấy token từ session
    return sessionStorage.getItem("token");
  }

  // isUserLoggedIn
  isUserLoggedIn(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }


  // Is user onl
  isUserOnl(): Observable<any> {
    const options = {
      headers: new HttpHeaders().append("Authorization", "Bearer " + this.getToken()),
    }
    return this.httpRequest.put(environment.apiUrl + "/api/user-onl", {}, options);
  }
}
