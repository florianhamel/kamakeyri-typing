import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { WikiData, WikiSummary } from '../../common/types';

@Injectable({
  providedIn: 'root'
})
export class WikiService {
  private readonly baseUrl = 'https://en.wikipedia.org/api/rest_v1/page';

  constructor(private http: HttpClient) {}

  fetchSummary(title: string): Observable<WikiSummary> {
    return this.http.get<WikiData>(`${this.baseUrl}/summary/${title}`).pipe(map((value) => this.normalizedData(value)));
  }

  fetchRelatedSummary(title: string): Observable<WikiSummary> {
    return this.http
      .get<{ pages: WikiData[] }>(`${this.baseUrl}/related/${title}`)
      .pipe(map((value) => this.normalizedData(value.pages[Math.floor(Math.random() * 20)])));
  }

  fetchRandomSummary(): Observable<WikiSummary> {
    return this.http.get<WikiSummary>(`${this.baseUrl}/random/summary`);
  }

  private normalizedData(value: WikiData): WikiSummary {
    return { extract: value.extract, title: value.titles.normalized };
  }
}
