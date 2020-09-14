import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  userData = new BehaviorSubject({})// to store data which is using another component
  constructor(private http:HttpClient) { }

  userLogin(name) {
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }
    var body ={
      name:name
    }
    return this.http.post<any>('https://jsonplaceholder.typicode.com/posts', body, { headers }).
        pipe(
           map((data: any) => {
             return data;
           }), catchError( error => {
             return throwError( 'Something went wrong!' );
           })
        )
  }

  cookieValue:string = "false";

  setFirstData(userDetails:any){
    this.userData.next(userDetails);
  }

  getFirstData(){
    return this.userData.asObservable();
  }

}
