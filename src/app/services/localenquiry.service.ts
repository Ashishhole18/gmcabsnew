import { Injectable } from '@angular/core';
import { Observable,of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Local } from '../interfaces/local';
import { Enquiry } from '../interfaces/Enquiry';
import { EnquiryModel } from '../models/enquiry.model';

@Injectable({
  providedIn: 'root'
})
export class LocalenquiryService {

 
  constructor(private http: HttpClient) { }

  public newEnquiry(enquiry):Observable<any>
  {
    return this.http.post("https://www.gmcabs.in/api/addEnquiry",enquiry,{responseType:'text' as 'json'});


  }

  addEnquiry(enquiry: EnquiryModel): Observable<any> {
    return this.http.post<EnquiryModel>('https://www.gmcabs.in/api/addEnquiry', enquiry,{responseType:'text' as 'json'} )
      .pipe(
        catchError(this.handleError<EnquiryModel>('Add User'))
      );
  }

  getLocal(): Observable<Local[]> {
    return this.http.get<Local[]>('http://localhost:3000/api/local')
      .pipe(
        tap(locals => console.log('local fetched!')),
        catchError(this.handleError<Local[]>('Get locals', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
