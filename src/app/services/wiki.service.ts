import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WikiSummary } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class WikiService {
  private readonly baseUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

  constructor(private http: HttpClient) {}

  fetchWikiSummary(title: string): Observable<WikiSummary> {
    return this.http.get<WikiSummary>(this.baseUrl + title);
  }
}
