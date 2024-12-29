import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { WikiSummary } from '../../domain/types/wiki.types';
import { WikiUri } from '../URIs/wiki-uri.enum';
import { toWikiSummary } from '../mappers/wiki.mappers';
import { WikiDTO } from '../DTOs/wiki.dto';

@Injectable({
  providedIn: 'root'
})
export class WikiService {
  constructor(private http: HttpClient) {}

  fetchSummary(label: string): Observable<WikiSummary> {
    const url = `${WikiUri.Scheme}://en.${WikiUri.BaseUri}/${WikiUri.Summary}/${label}`;
    return this.http.get<WikiDTO>(url).pipe(map((value) => toWikiSummary(value)));
  }

  fetchRelatedSummary(label: string): Observable<WikiSummary> {
    const url = `${WikiUri.Scheme}://en.${WikiUri.BaseUri}/${WikiUri.Related}/${label}`;
    return this.http
      .get<{ pages: WikiDTO[] }>(url)
      .pipe(map((value) => toWikiSummary(value.pages[Math.floor(Math.random() * 20)])));
  }

  fetchRandomSummary(): Observable<WikiSummary> {
    const url = `${WikiUri.Scheme}://en.${WikiUri.BaseUri}/${WikiUri.Random}/${WikiUri.Summary}`;
    return this.http.get<WikiSummary>(url);
  }
}
