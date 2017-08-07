# Google tasks App

[Demo](http://codeforges.com/google-tasks/)

[repo](https://github.com/rubenCodeforges/angular-google-tasks-test-waes)


This project was generated with [angular-cli](https://github.com/angular/angular-cli)

## Intallation 
- clone project
- cd to project
- run command

```
npm install
```

## Configuration of ng-gapi

The configs are are provide to the `forRoot()` method, replace `CLIEND_ID` with your client_id

```typescript
let gapiClientConfig: ClientConfig = {
    clientId: "CLIENT_ID",
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

## ng-gapi 

Ng gapi is a npm module that can be install via npm
See the [repo](https://github.com/rubenCodeforges/angular2-google-api) or [npm](https://www.npmjs.com/package/ng-gapi)