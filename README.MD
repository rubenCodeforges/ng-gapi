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
and set the configuration.

##### ClientConfig interface
Bellow are all available parameters that can be provided in the `forRoot()` method.
```typescript
export interface NgGapiClientConfig extends ClientConfig {
    discoveryDocs: string[];
}


//And the extended ClientConfig
interface ClientConfig {
    /**
     * The app's client ID, found and created in the Google Developers Console.
     */
    client_id?: string;

    /**
     * The domains for which to create sign-in cookies. Either a URI, single_host_origin, or none.
     * Defaults to single_host_origin if unspecified.
     */
    cookie_policy?: string;

    /**
     * The scopes to request, as a space-delimited string. Optional if fetch_basic_profile is not set to false.
     */
    scope?: string;

    /**
     * Fetch users' basic profile information when they sign in. Adds 'profile' and 'email' to the requested scopes. True if unspecified.
     */
    fetch_basic_profile?: boolean;

    /**
     * The Google Apps domain to which users must belong to sign in. This is susceptible to modification by clients,
     * so be sure to verify the hosted domain property of the returned user. Use GoogleUser.getHostedDomain() on the client,
     * and the hd claim in the ID Token on the server to verify the domain is what you expected.
     */
    hosted_domain?: string;

    /**
     * Used only for OpenID 2.0 client migration. Set to the value of the realm that you are currently using for OpenID 2.0,
     * as described in <a href="https://developers.google.com/accounts/docs/OpenID#openid-connect">OpenID 2.0 (Migration)</a>.
     */
    openid_realm?: string;

    /**
     * The UX mode to use for the sign-in flow.
     * By default, it will open the consent flow in a popup.
     */
    ux_mode?: "popup" | "redirect";

    /**
     * If using ux_mode='redirect', this parameter allows you to override the default redirect_uri that will be used at the end of the consent flow.
     * The default redirect_uri is the current URL stripped of query parameters and hash fragment.
     */
    redirect_uri?: string;
  }
```

##### Example:
```typescript
let gapiClientConfig: NgGapiClientConfig = {
    client_id: "CLIENT_ID",
    discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
    scope: [
        "https://www.googleapis.com/auth/analytics.readonly",
        "https://www.googleapis.com/auth/analytics"
    ].join(" ")
};

@NgModule({
    imports: [
        //...
          GoogleApiModule.forRoot({
            provide: NG_GAPI_CONFIG,
            useValue: gapiClientConfig
          }),
        //...
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
        gapiService.onLoad().subscribe(()=> {
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
As shown in the example you simply provide a configuration object of type `ClientConfig`.
```typescript
 {
   client_id: "your client id",
   discoveryDocs: ["url to discovery docs", "another url"],
   scope: "space separated scopes"
}
```
Configure them according your google app configurations and resource scope.

- To get the clientId see in your [developer console](https://console.developers.google.com/apis/credentials)
- The discoveryDoc is in the resource description, here an example for
 [Reporting API v4](https://developers.google.com/analytics/devguides/reporting/core/v4/rest/)
- The scope is also in the documentation of the specific API , example for [Reporting API v4](https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet#authorization)



#### Promotion
In this section i would like to point your attention on some intresting projects.

- You like typescript ? 
- You love Angular ?
- You would like to have a quick solution for building you own APIs using known stacks ?

Then [NestJs](http://docs.nestjs.com/) is what you are looking for.

What i can tell:

Ive used some of the popular frameworks for backend, like Symfony(Php) and Spring(Java) and i see that Nest is utilizing the best approaches from both, even more, it will be very understandable for Angular developers.

In other words , i support this project , please give it a try. 
