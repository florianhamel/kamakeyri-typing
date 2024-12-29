import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiUri } from '../URIs/api-uri.enum';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  constructor(private http: HttpClient) {}

  findCommonWords(): Observable<ReadonlyArray<string>> {
    const url = `${ApiUri.Scheme}://${ApiUri.BaseUri}/${ApiUri.CommonWords}/en`;
    return this.http.get<Record<string, number>>(url).pipe(map((record) => [...Object.keys(record)]));
  }
}
