import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }



  createProduct(item: any): Observable<any> {
    const options = {
      headers: new HttpHeaders().append("Authorization", "Bearer " + this.getToken()),
    }
    return this.http.post(environment.apiUrl + '/api/create-product', item, options)
  }

  getToken() {
    // Lấy token từ session
    return sessionStorage.getItem("token");
  }



}
