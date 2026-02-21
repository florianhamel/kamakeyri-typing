import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { contactEmail } from '../../domain/constants/api.const';
import { WikiLang, WikiSummary } from '../../domain/types/wiki.type';
import { WikiRepository } from '../../domain/repositories/wiki.repository';
import { selectWikiLang } from '../../state/selectors/wiki.selectors';
import { toWikiSummary } from '../../infrastructure/mappers/wiki.mappers';
import { WikiDTO } from '../../infrastructure/DTOs/wiki.dtos';
import { wikiUri } from '../constants/wiki.const';

@Injectable()
export class WikiHttpRepository implements WikiRepository {
  private readonly headers: HttpHeaders = new HttpHeaders({ 'Api-User-Agent': contactEmail });
  private readonly wikiLang: Signal<WikiLang>;

  constructor(
    private readonly http: HttpClient,
    private readonly store: Store
  ) {
    this.wikiLang = this.store.selectSignal(selectWikiLang);
  }

  fetchSummary(label: string): Observable<WikiSummary> {
    const url = `${wikiUri.scheme}://${this.wikiLang()}.${wikiUri.baseUri}/${wikiUri.summary}/${label}`;
    const options = { headers: this.headers };

    return this.http.get<WikiDTO>(url, options).pipe(map((value) => toWikiSummary(value)));
  }

  fetchRelatedSummary(label: string): Observable<WikiSummary> {
    const url = `${wikiUri.scheme}://${this.wikiLang()}.${wikiUri.baseUri}/${wikiUri.related}/${label}`;
    const options = { headers: this.headers };

    return this.http
      .get<{ pages: WikiDTO[] }>(url, options)
      .pipe(map((value) => toWikiSummary(value.pages[Math.floor(Math.random() * 20)])));
  }

  fetchRandomSummary(): Observable<WikiSummary> {
    const url = `${wikiUri.scheme}://${this.wikiLang()}.${wikiUri.baseUri}/${wikiUri.random}/${wikiUri.summary}`;
    const options = { headers: this.headers };

    return this.http.get<WikiSummary>(url, options);
  }
}
