import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WikiSummary } from '../../models/types';

@Injectable({
  providedIn: 'root'
})
export class WikiService {
  private readonly baseUrl = 'https://en.wikipedia.org/api/rest_v1/page';

  constructor(private http: HttpClient) {}

  fetchSummary(title: string): Observable<WikiSummary> {
    return this.http.get<WikiSummary>(`${this.baseUrl}/summary/${title}`);
  }

  fetchRandomSummary(): Observable<WikiSummary> {
    return this.http.get<WikiSummary>(`${this.baseUrl}/random/summary`);
  }
}
