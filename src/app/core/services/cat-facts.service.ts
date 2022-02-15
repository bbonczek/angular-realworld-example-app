import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CatFact } from '../models/cat-fact.model';

@Injectable({
  providedIn: 'root',
})
export class CatFactsService {
  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  getRandom(): Observable<CatFact> {
    return this.http
      .get<CatFact>(`${environment.cat_facts_url}/facts/random`)
      .pipe(catchError(this.formatErrors));
  }
}
