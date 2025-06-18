import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environments';
import { LoginRequest, LoginResponse, AuthState } from '../../../interfaces/auth.interface';
import { CookieService } from '../../cookie.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl;
    private authStateSubject = new BehaviorSubject<AuthState>({
        isAuthenticated: false,
        token: null,
        user: null
    });

    public authState$ = this.authStateSubject.asObservable();

    constructor(
        private http: HttpClient,
        private cookieService: CookieService
    ) {
        this.loadStoredAuth();
    }

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
            .pipe(
                tap(response => {
                    this.setAuthState(response);
                })
            );
    }

    logout(): void {
        this.clearAuthState();
    }

    getToken(): string | null {
        return this.cookieService.getCookie('auth_token');
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    private setAuthState(response: LoginResponse): void {
        const { token, user } = response.data;

        // Salvar token em cookie com expiração de 1 hora
        this.cookieService.setCookie('auth_token', token, 1);
        this.cookieService.setCookie('auth_user', JSON.stringify(user), 1);

        this.authStateSubject.next({
            isAuthenticated: true,
            token: token,
            user: user
        });
    }

    private clearAuthState(): void {
        this.cookieService.deleteCookie('auth_token');
        this.cookieService.deleteCookie('auth_user');

        this.authStateSubject.next({
            isAuthenticated: false,
            token: null,
            user: null
        });
    }

    private loadStoredAuth(): void {
        const token = this.cookieService.getCookie('auth_token');
        const user = this.cookieService.getCookie('auth_user');

        if (token && user && !this.isTokenExpired(token)) {
            try {
                const userData = JSON.parse(user);
                this.authStateSubject.next({
                    isAuthenticated: true,
                    token: token,
                    user: userData
                });
            } catch (error) {
                console.error('Erro ao parsear dados do usuário:', error);
                this.clearAuthState();
            }
        }
    }

    private isTokenExpired(token: string): boolean {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expirationTime = payload.exp * 1000; // Convert to milliseconds
            return Date.now() >= expirationTime;
        } catch {
            return true;
        }
    }

    getAuthHeaders(): HttpHeaders {
        const token = this.getToken();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }
} 