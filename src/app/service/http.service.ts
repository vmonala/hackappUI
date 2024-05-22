import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Add this line
import { IdeaService } from './idea.service';
import { Observable, catchError, throwError } from 'rxjs';
import { IdeaResponseService } from './idea-response.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }


  getData() {
    return this.http.get('http://localhost:8080/ideas').pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(error);
      })
    );
  }

  postData(idea: IdeaService){
    return this.http.post('http://localhost:8080/ideas',idea).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(error);
      })
    );
  }

  getDataAsObject(): Observable<IdeaResponseService[]> {
    return this.http.get<IdeaResponseService[]>('http://localhost:8080/ideas').pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(error);
      })
    );
  }

}
