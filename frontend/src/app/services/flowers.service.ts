import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flower } from '../models/flowers.model';

@Injectable({
  providedIn: 'root'
})
export class FlowerService {

  private apiUrl = 'http://localhost:3001/api/flowers';

  constructor(private http: HttpClient) {}

  getFlowers(): Observable<Flower[]> {
    return this.http.get<Flower[]>(this.apiUrl);
  }

  addFlower(flower: Flower): Observable<any> {
    return this.http.post(this.apiUrl, flower);
  }

  deleteFlower(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
