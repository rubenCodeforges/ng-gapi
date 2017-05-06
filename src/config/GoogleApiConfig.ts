export class GoogleApiConfig {
    protected CLIENT_ID: string;
    protected DISCOVERY_DOCS: string[];
    protected SCOPE: string;

    constructor(configs: GapiInitConfigs) {
        this.CLIENT_ID = configs.clientId;
        this.DISCOVERY_DOCS = configs.discoveryDocs;
        this.SCOPE = configs.scope;
    }

    public getConfigs(): GapiInitConfigs {
        return {
            clientId: this.CLIENT_ID,
            discoveryDocs: this.DISCOVERY_DOCS,
            scope: this.SCOPE
        }
    }
}

export interface GapiInitConfigs {
    clientId: string,
    discoveryDocs: string[],
    scope: string
}