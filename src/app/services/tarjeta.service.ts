import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  //Obtenemos las urls de la api

  private urlBackend = "https://localhost:44311/"
  private urlapi = "api/Tarjeta/"

  //Inyectamos el metodo HttpClient
  constructor(private http: HttpClient) { }


  getTarjetas(): Observable<any> {
    return this.http.get(this.urlBackend + this.urlapi);
  }

  deleteTarjetas(id: number): Observable<any> {
    return this.http.delete(this.urlBackend + this.urlapi + id)
  }

  saveTarjetas(tarjeta:any):Observable<any>{
    return this.http.post(this.urlBackend + this.urlapi , tarjeta);
  }

  editTarjetas(id : number , tarjeta :any) :Observable<any>{
    return this.http.put(this.urlBackend + this.urlapi+id,tarjeta);
  }

}
