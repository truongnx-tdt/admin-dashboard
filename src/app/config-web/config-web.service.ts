import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigWebService {
  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();
  constructor(private http: HttpClient) { }

  getToken() {
    // Lấy token từ session
    return sessionStorage.getItem("token_admin");
  }

  fetchData() {
    this.getData().subscribe(
      (data) => {
        this.dataSubject.next(data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  createNew(data: FormData): Observable<any> {
    const options = {
      headers: new HttpHeaders().append("Authorization", "Bearer " + this.getToken()),
    }
    return this.http.post(environment.apiUrl + '/api/create-banner', data, options)
  }

  getData(): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/get-data-banner').pipe(
      map((item: any) => item.response.data.data)
    )
  }

  updatebanner(id: number, active: boolean): Observable<any> {
    const options = {
      headers: new HttpHeaders().append("Authorization", "Bearer " + this.getToken()),
    }
    return this.http.post(environment.apiUrl + '/api/update-banner?id=' + id + '&active=' + active, {}, options)
  }

  deleltebyId(id: number): Observable<any> {
    const options = {
      headers: new HttpHeaders().append("Authorization", "Bearer " + this.getToken()),
    }
    return this.http.delete(environment.apiUrl + '/api/delete-id?id=' + id, options)
  }
}
