import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { WikiLang, WikiSummary } from '../../domain/types/wiki.types';
import { WikiUri } from '../URIs/wiki-uri.enum';
import { toWikiSummary } from '../mappers/wiki.mappers';
import { WikiDTO } from '../DTOs/wiki.dto';
import { contactEmail } from '../../domain/constants/api.constants';
import { Store } from '@ngrx/store';
import { selectWikiLang } from '../../state/selectors/wiki.selectors';

@Injectable({
  providedIn: 'root'
})
export class WikiService {
  private readonly headers: HttpHeaders = new HttpHeaders({ 'Api-User-Agent': contactEmail });
  private readonly wikiLang: Signal<WikiLang>;

  constructor(
    private readonly http: HttpClient,
    private readonly store: Store
  ) {
    this.wikiLang = this.store.selectSignal(selectWikiLang);
  }

  fetchSummary(label: string): Observable<WikiSummary> {
    const url = `${WikiUri.Scheme}://${this.wikiLang()}.${WikiUri.BaseUri}/${WikiUri.Summary}/${label}`;
    const options = { headers: this.headers };

    return this.http.get<WikiDTO>(url, options).pipe(map((value) => toWikiSummary(value)));
  }

  fetchRelatedSummary(label: string): Observable<WikiSummary> {
    const url = `${WikiUri.Scheme}://${this.wikiLang()}.${WikiUri.BaseUri}/${WikiUri.Related}/${label}`;
    const options = { headers: this.headers };

    return this.http
      .get<{ pages: WikiDTO[] }>(url, options)
      .pipe(map((value) => toWikiSummary(value.pages[Math.floor(Math.random() * 20)])));
  }

  fetchRandomSummary(): Observable<WikiSummary> {
    const url = `${WikiUri.Scheme}://${this.wikiLang()}.${WikiUri.BaseUri}/${WikiUri.Random}/${WikiUri.Summary}`;
    const options = { headers: this.headers };

    return this.http.get<WikiSummary>(url, options);
  }
}
