import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TollLog, CreateTollLogDto } from '../models/toll-log.model';

@Injectable({
  providedIn: 'root'
})
export class TollLogsService {
  // Direct URL to backend - no proxy needed
  private readonly apiUrl = 'http://localhost:3000/logs';

  constructor(private http: HttpClient) {}

  getLogs(): Observable<TollLog[]> {
    return this.http.get<TollLog[]>(this.apiUrl);
  }

  createLog(dto: CreateTollLogDto): Observable<TollLog> {
    return this.http.post<TollLog>(this.apiUrl, dto);
  }
}
