import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

export type AuthResultStatus =
  | 'MUST_CHANGE_PASSWORD'
  | 'NEW_PASSWORD_REQUIRED'
  | 'MFA_REQUIRED'
  | 'MFA_SETUP'
  | 'SUCCESS';

export interface AuthResult {
  status: AuthResultStatus;
  token?: string;
}

interface LoginResponse {
  status: AuthResultStatus;
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly base = (window as any)['API_URL'] || 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) {}

  /**
   * Calls the backend login endpoint and returns an Observable of AuthResult or false on error.
   */
  login(email: string, password: string): Observable<AuthResult | false> {
    if (!email || !password) return of(false as const);

    const url = `${this.base}/authentication/login`;
    return this.http.post<LoginResponse>(url, { email, password }).pipe(
      map((r) => ({ status: r.status, token: r.token } as AuthResult)),
      catchError(() => of(false as const)),
    );
  }
}
