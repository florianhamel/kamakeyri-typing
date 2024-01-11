import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../environments/environment.development';
import { SessionDto } from '../models/session.types';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  readonly baseUrl: string = `${env.apiUrl}/typing`;

  constructor(private readonly http: HttpClient) {}

  uploadSession(sessionDto: SessionDto): void {
    this.http.post<void>(`${this.baseUrl}/sessions`, sessionDto);
  }
}
