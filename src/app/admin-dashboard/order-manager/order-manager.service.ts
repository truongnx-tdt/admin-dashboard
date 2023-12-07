import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderManagerService {

  constructor(private http: HttpClient) { }
  getOrderData(): Observable<any> {
    const options = {
      headers: new HttpHeaders().append("Authorization", "Bearer " + this.getToken()),
    }
    return this.http.get(environment.apiUrl + '/api/order-list', options).pipe(
      map((res: any)=> res.response.data.orders)
    )
  }

  getToken() {
    // Lấy token từ session
    return sessionStorage.getItem("token_admin");
  }

}
