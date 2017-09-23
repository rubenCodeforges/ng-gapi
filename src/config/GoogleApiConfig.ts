import ClientConfig = gapi.auth2.ClientConfig;

export interface NgGapiClientConfig extends ClientConfig {
    discoveryDocs: string[];
}

export class GoogleApiConfig {
    protected clientConfig: NgGapiClientConfig;

    constructor(clientConfig: NgGapiClientConfig) {
        this.clientConfig = clientConfig
    }

    public getClientConfig(): NgGapiClientConfig {
        return this.clientConfig;
    }
}
