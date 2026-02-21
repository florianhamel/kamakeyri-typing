import { Observable, map } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { apiUri } from '../constants/api.const';
import { WordsRepository } from '../../domain/repositories/words.repository';

@Injectable()
export class WordsHttpRepository implements WordsRepository {
  constructor(private readonly http: HttpClient) {}

  findCommonWords(): Observable<ReadonlyArray<string>> {
    const url = `${apiUri.scheme}://${apiUri.baseUri}/${apiUri.commonWords}/en`;
    return this.http.get<Record<string, number>>(url).pipe(map((record) => [...Object.keys(record)]));
  }
}
