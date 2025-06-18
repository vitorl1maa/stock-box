import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CookieService {

    constructor() { }

    /**
     * Define um cookie com expiração
     * @param name Nome do cookie
     * @param value Valor do cookie
     * @param hours Horas até expirar
     * @param secure Se deve ser HTTPS apenas
     */
    setCookie(name: string, value: string, hours: number, secure: boolean = false): void {
        const expires = new Date();
        expires.setTime(expires.getTime() + (hours * 60 * 60 * 1000));

        let cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;

        if (secure) {
            cookieString += ';Secure';
        }

        document.cookie = cookieString;
    }

    /**
     * Obtém o valor de um cookie
     * @param name Nome do cookie
     * @returns Valor do cookie ou null se não existir
     */
    getCookie(name: string): string | null {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    /**
     * Remove um cookie
     * @param name Nome do cookie
     */
    deleteCookie(name: string): void {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }

    /**
     * Verifica se um cookie existe
     * @param name Nome do cookie
     * @returns true se o cookie existe
     */
    hasCookie(name: string): boolean {
        return this.getCookie(name) !== null;
    }

    /**
     * Obtém todos os cookies como objeto
     * @returns Objeto com todos os cookies
     */
    getAllCookies(): { [key: string]: string } {
        const cookies: { [key: string]: string } = {};
        const ca = document.cookie.split(';');

        for (let i = 0; i < ca.length; i++) {
            const c = ca[i].trim();
            const eqIndex = c.indexOf('=');
            if (eqIndex > 0) {
                const name = c.substring(0, eqIndex);
                const value = c.substring(eqIndex + 1);
                cookies[name] = value;
            }
        }

        return cookies;
    }
} 