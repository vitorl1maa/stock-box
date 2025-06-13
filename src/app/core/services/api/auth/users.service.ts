import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { UserPayload } from '../../../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}/create-user`;

  constructor(private httpClient: HttpClient) { }

  createUser(payload: UserPayload): Observable<any> {
    return this.httpClient.post(this.apiUrl, payload)
  }
}
