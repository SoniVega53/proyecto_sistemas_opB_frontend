import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  //public urlService: string = 'http://172.18.0.1:9090/api/proyecto/';
  public urlService: string = "http://localhost:9090/api/proyecto/"

  constructor(public http: HttpClient, public router: Router) {}

  protected getService(url: string): Observable<any> {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get(this.urlService.concat(url),{headers})
      .pipe(catchError(async (e) => console.log(e)));
  }

  protected deleteService(url: string): Observable<any> {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .delete(this.urlService.concat(url),{headers})
      .pipe(catchError(async (e) => console.log(e)));
  }

  protected putServiceBody(url: string, body: any): Observable<any> {
    return this.http
      .put(this.urlService.concat(url), body)
      .pipe(catchError(async (e) => console.log(e)));
  }

  protected postServiceBody(url: string, body: any): Observable<any> {
    const token = localStorage.getItem('token'); // Obtén el token del localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .post(this.urlService.concat(url), body,{headers})
      .pipe(catchError(async (e) => console.log(e)));
  }

  postToken(url: string, body: any): Observable<any> {
    // return this.http
    //   .post<{ token: string }>(this.urlService.concat('noauth/login'), body)
    //   .subscribe((response) => {
    //     localStorage.setItem('token', response.token);
    //     this.router.navigate(['/home']);
    //   });

    return this.http
      .post<{ token: string }>(this.urlService.concat(url), body)
      .pipe(catchError(async (e) => console.log(e)));
  }
}
