import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WikiService {
  private readonly baseUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

  constructor(private http: HttpClient) {}

  fetchWikiSummary(title: string): Observable<{ extract: string }> {
    return this.http.get<{ extract: string }>(this.baseUrl + title);
  }
}
