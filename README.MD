### Angular 2 Google api module (ng-gapi)

This module will add the google api to your project.
It wraps the Gapi in to a service layer allowing to work with Gapi
in a Angular 2+ project.

#### Installation

```js
npm install ng-gapi
```

#### Usage

To use the `ng-gapi` simply add `GoogleApiModule` to your module imports
and set the configuration
```typescript
@NgModule({
    imports: [
        ...
        GoogleApiModule.setConfig(
            new GoogleApiConfig(
                CLIENT_ID, DISCOVERY_DOCS, SCOPE
            )
        ),
        ...
    ]
})
export MyModule {}
```

Now you will have Access to the GoogleApi service.
The service has a a event method `onLoad(callback)`
This event will fire when the gapi script is loaded.

Usage example :

```typescript
export class FooService {
    constructor(gapiService: GoogleApiService) {
        gapiService.onLoad(()=> {
           // Here we can use gapi
            
        });
    }
}
```

#### GoogleAuthService 
The module has a GoogleAuth service which allows you to work with 
the google auth

Usage:
```typescript
//Example of a UserService 

@Injectable()
export class UserService {
    public static SESSION_STORAGE_KEY: string = 'accessToken';
    private user: GoogleUser;
    
    constructor(private googleAuth: GoogleAuthService){ 
    }
    
    public getToken(): string {
        let token: string = sessionStorage.getItem(UserService.SESSION_STORAGE_KEY);
        if (!token) {
            throw new Error("no token set , authentication required");
        }
        return sessionStorage.getItem(UserService.SESSION_STORAGE_KEY);
    }
    
    public signIn(): void {
        this.googleAuth.getAuth()
            .subscribe((auth) => {
                auth.signIn().then(res => this.signInSuccessHandler(res));
            });
    }
    
    private signInSuccessHandler(res: GoogleUser) {
            this.user = res;
            sessionStorage.setItem(
                UserService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
            );
        }
}
```

Lets go step by step through the example

1. We create a angular Injectable() "service"
2. The static property `SESSION_STORAGE_KEY` is just a sugar to store string in a property rather then hardcode
3. in the constructor we inject the GoogleAuthService and making it a private property of our User class
4. no we have 2 public methods , sign in and get token. The signIn should be used at user login page , it will open the google 
auth popup. 
5. The get token method is used for http request to google resource where a authentication is required.

