import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BYPASS_JWT_TOKEN } from '..';
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
    const context = new HttpContext().set(BYPASS_JWT_TOKEN, true);

    return this.http
      .get<CatFact>(`${environment.cat_facts_url}/facts/random`, { context })
      .pipe(catchError(this.formatErrors));
  }
}
