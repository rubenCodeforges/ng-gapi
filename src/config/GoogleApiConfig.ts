import {GapiAuthInitProperties} from "./GapiAuthInitProperties";

export class GoogleApiConfig {
    protected CLIENT_ID: string;
    protected DISCOVERY_DOCS: string[];
    protected SCOPE: string;

    constructor(CLIENT_ID: string, DISCOVERY_DOCS: string[], SCOPE: string) {
        this.CLIENT_ID = CLIENT_ID;
        this.DISCOVERY_DOCS = DISCOVERY_DOCS;
        this.SCOPE = SCOPE;
    }

    public getAuthConfig(): GapiAuthInitProperties {
        return {
            client_id: this.CLIENT_ID,
            discoveryDocs: this.DISCOVERY_DOCS,
            scope: this.SCOPE
        }
    }
}