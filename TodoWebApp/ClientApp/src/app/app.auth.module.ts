import {NgModule} from '@angular/core';
import {MsalGuard, MsalInterceptor, MsalModule} from "@azure/msal-angular";
import {InteractionType, PublicClientApplication} from "@azure/msal-browser";
import {msalConfig, protectedResources} from "./auth.config";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

@NgModule({
  imports: [
    MsalModule.forRoot(new PublicClientApplication(msalConfig),
      {
        // The routing guard configuration.
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: protectedResources.todoItemsApi.scopes
        }
      },
      {
        // MSAL interceptor configuration.
        // The protected resource mapping maps your web API with the corresponding app scopes. If your code needs to call another web API, add the URI mapping here.
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          [protectedResources.todoItemsApi.endpoint, protectedResources.todoItemsApi.scopes]
        ])
      }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
  ],
  exports: [MsalModule]
})
export class AppMsalModule { }
