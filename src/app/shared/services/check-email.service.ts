import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, Observable, switchMap, timer } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CheckEmailService {

  constructor(private httpClient: HttpClient) {
  }

  searchEmail(text:any) {
    return timer(2000)
      .pipe(
        switchMap(() => this.httpClient.get(`${environment.apiUrl}/users/validate/${text}`)),
      ); // PIPE ENDS HERE
  }


  emailValidate(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      console.log(control.value);
      return this.searchEmail(control.value)
        .pipe(
          //{ message: string, status: boolean, user: object }
          map((res:any) => {
            if (res.status) {
              return {taken: true};
            }
            return null;
          })
        ); // PIPE ENDS HERE
    };
  }
}
