import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { getEnv } from '../env/env.config';

export interface Credentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user?: any;
    expiresIn?: number;
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private readonly tokenKey = 'auth_token';
    private readonly userKey = 'auth_user';
    private authSubject = new BehaviorSubject<boolean>(this.hasToken());
    public auth$ = this.authSubject.asObservable();

    constructor(private http: HttpClient) {}

    private get apiBase(): string {
        return (getEnv().apiUrl ?? '').replace(/\/$/, '');
    }

    login(creds: Credentials): Observable<AuthResponse> {
        const url = `${this.apiBase}/authentication/login`;
        return this.http.post<AuthResponse>(url, creds).pipe(
            tap(res => {
                if (res && res.token) {
                    this.setToken(res.token);
                    if (res.user) this.setUser(res.user);
                    this.authSubject.next(true);
                }
            }),
            catchError(err => {
                // eslint-disable-next-line no-console
                console.error('[LoginService] login error for', url, err);
                return throwError(() => err);
            })
        );
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
        this.authSubject.next(false);
    }

    isAuthenticated(): boolean {
        return this.hasToken();
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    get currentUser(): any | null {
        const u = localStorage.getItem(this.userKey);
        return u ? JSON.parse(u) : null;
    }

    getAuthHeaders(): HttpHeaders {
        const token = this.getToken();
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }

    // Optional: call to refresh token endpoint if your backend supports it
    refreshToken(): Observable<AuthResponse> {
        const url = `${this.apiBase}/auth/refresh`;
        return this.http.post<AuthResponse>(url, {}, { headers: this.getAuthHeaders() }).pipe(
            tap(res => {
                if (res && res.token) {
                    this.setToken(res.token);
                    if (res.user) this.setUser(res.user);
                    this.authSubject.next(true);
                }
            }),
            catchError(err => {
                // eslint-disable-next-line no-console
                console.error('[LoginService] refresh token error for', url, err);
                this.logout();
                return throwError(() => err);
            })
        );
    }

    private setToken(token: string) {
        localStorage.setItem(this.tokenKey, token);
    }

    private setUser(user: any) {
        localStorage.setItem(this.userKey, JSON.stringify(user));
    }

    private hasToken(): boolean {
        return !!localStorage.getItem(this.tokenKey);
    }
}