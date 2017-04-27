### Angular 2 Google api module (ng-gapi)

This module will add the google api to your project.
It wraps the Gapi in to a service layer allowing to work with Gapi
in a Angular 2+ project.

####Installation

```js
npm install ng-gapi
```

#### Usage

To use the `ng-gapi` simply add `GoogleApiModule` to your module imports

```typescript
@NgModule({
    imports: [
        ...
        GoogleApiModule,
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

```