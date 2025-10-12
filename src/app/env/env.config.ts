// src/app/env/env.config.ts

export interface EnvConfig {
    production: boolean;
    apiUrl: string;
    authEndpoint?: string;
    clientId?: string;
    featureFlags?: Record<string, boolean>;
    [key: string]: unknown;
}

const DEFAULT_ENV: EnvConfig = {
    production: false,
    apiUrl: 'http://localhost:3000',
    authEndpoint: '/auth',
    clientId: '',
    featureFlags: {},
};

// support optional runtime override via window.__env or a JSON file loaded at startup
declare global {
    interface Window {
        __env?: Partial<EnvConfig>;
    }
}

// Mutable internal config object so load functions can update values
const CONFIG: EnvConfig = { ...DEFAULT_ENV, ...(typeof window !== 'undefined' ? window.__env ?? {} : {}) };

/**
 * Returns the current environment configuration (read-only view).
 */
export function getEnv(): Readonly<EnvConfig> {
    return CONFIG;
}

/**
 * Load runtime configuration from a JSON file (e.g. /env.json) and merge into CONFIG.
 * Call this during app initialization (APP_INITIALIZER) if you want runtime overrides.
 */
export async function loadEnvFrom(url = '/env.json'): Promise<void> {
    try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) return;
        const data = (await res.json()) as Partial<EnvConfig>;
        Object.assign(CONFIG, data);
        // also keep window.__env in sync for other scripts
        if (typeof window !== 'undefined') window.__env = { ...(window.__env ?? {}), ...data };
    } catch {
        // silence errors; keep defaults
    }
}

export const ENV = CONFIG;