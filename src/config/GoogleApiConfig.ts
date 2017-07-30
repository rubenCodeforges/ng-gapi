/**
 * @description https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig
 */
export interface ClientConfig {
    clientId: string;
    discoveryDocs: string[];
    scope: string;
    ux_mode?: string;
    fetch_basic_profile?: boolean;
    cookie_policy?: string;
    hosted_domain?: string;
    redirect_uri?: string;
}

export class GoogleApiConfig {
    protected clientConfig: ClientConfig;

    constructor(clientConfig: ClientConfig) {
        this.clientConfig = clientConfig
    }

    public getClientConfig(): ClientConfig {
        return this.clientConfig;
    }
}
