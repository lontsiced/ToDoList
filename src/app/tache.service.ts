import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Tache } from './tache';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'ionis-group': 'B' })
};
const apiUrl = 'http://9044af4c-8a85-430f-9436-f2908a508b0b.pub.cloud.scaleway.com/todos-management/rest/todos';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(private http: HttpClient) { }

  getTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(apiUrl,httpOptions)
      .pipe(
        tap(tache => console.log('fetched taches')),
        catchError(this.handleError('getTaches', []))
      );
  }

  getTache(id: number): Observable<Tache> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Tache>(url,httpOptions).pipe(
      tap(_=> console.log(`fetched Tache id=${id}`)),
      catchError(this.handleError<Tache>('getTache id=${id}'))
    );
  }

  addTache(tache: Tache): Observable<Tache> {
    return this.http.post<Tache>(apiUrl, tache, httpOptions).pipe(
      tap((tache1: any) => console.log(`Tache ajoutée w/ id=${tache1.id}`)),
      catchError(this.handleError<Tache>('addTache'))
    );
  }

  updateTache(id: any, tache: Tache): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, tache, httpOptions).pipe(
      tap(_ => console.log(`Modifie tache id=${id}`)),
      catchError(this.handleError<any>('updateTache'))
    );
  }

  deleteTache(id: any): Observable<Tache> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Tache>(url, httpOptions).pipe(
      tap(_ => console.log(`supprimer tache id=${id}`)),
      catchError(this.handleError<Tache>('deleteTache'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
