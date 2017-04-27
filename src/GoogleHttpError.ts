export interface GoogleHttpError {
    domain: string;
    reason: string;
    locationType: string;
    location: string;
}

export interface GoogleHttpErrorBody {
    error: {
        errors: GoogleHttpError[]
    };
    code: number;
    message: string;
}
