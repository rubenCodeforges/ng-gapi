### Angular 4 Google api module (ng-gapi)

This module will add the google api to your project.
It wraps the Gapi in to a service layer allowing to work with Gapi
in a Angular 4+ project.

#### Latest change

- Requires now Typescript version 2.3 or higher
- Requires Angular4 or higher

#### Installation

```js
npm install ng-gapi
```

#### Usage

To use the `ng-gapi` simply add `GoogleApiModule` to your module imports
and set the configuration
```typescript
let gapiConfig = {
    clientId: "CLIENT_ID",
    discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
    scope: [
        "https://www.googleapis.com/auth/analytics.readonly",
        "https://www.googleapis.com/auth/analytics"
    ].join(" ")
};

@NgModule({
    imports: [
        ...
          GoogleApiModule.forRoot({
            provide: NG_GAPI_CONFIG,
            useValue: gapiConfig
          }),
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

Also check the example folder with a google api reports module

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


#### Configurations
The GoogleApiConfig class provides the required configuration for the Api

Configuration is easy to use. The GoogleApiModule has a static method which sets the configs. 
As shown in the example you simply provide a configuration object of type `GapiInitConfigs`.
```typescript
 {
   clientId: "your client id",
   discoveryDocs: ["url to discovery docs", "another url"],
   scope: "space separated scopes"
}
```
Configure them according your google app configurations and resource scope.

- To get the clientId see in your [developer console](https://console.developers.google.com/apis/credentials)
- The discoveryDoc is in the resource description, here an example for
 [Reporting API v4](https://developers.google.com/analytics/devguides/reporting/core/v4/rest/)
- The scope is also in the documentation of the specific API , example for [Reporting API v4](https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet#authorization)

#### Examples 

The examples can be used as modules , you need a basic Angular2 project , then add the example module to your projects folder
and import the exampleModule in your AppModule

- ng-gapi [Reporting API v4 example](https://github.com/rubenCodeforges/angular2-google-api/tree/master/examples/gapiReporting)
