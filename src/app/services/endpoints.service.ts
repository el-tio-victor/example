import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  constructor( private http:HttpClient) { }

  
  get(url:string){
    url = url.replace(":tu_nombre", "victor");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
   });
   
  let params = { headers: headers };
    return this.http.get(url,params);
  }

  post(url:string, data:any){

    url = url.replace(":tu_nombre", "victor");
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
   });
   let options = {headers:headers};
   return this.http.post(url,data,options);
  }
}
