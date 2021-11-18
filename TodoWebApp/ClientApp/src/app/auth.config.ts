import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export const b2cPolicies = {
  names: {
    signUpSignIn: "b2c_1_susi",
    editProfile: "b2c_1_edit"
  },
  authorities: {
    signUpSignIn: {
      authority: "https://zoo0mb2c.b2clogin.com/zoo0mb2c.onmicrosoft.com/B2C_1_susi",
    },
    editProfile: {
      authority: "https://zoo0mb2c.b2clogin.com/zoo0mb2c.onmicrosoft.com/B2C_1_edit"
    }
  },
  authorityDomain: "zoo0mb2c.b2clogin.com"
};


export const msalConfig: Configuration = {
  auth: {
    clientId: 'f3981ba5-6cd1-457b-b554-78fd3399958a',
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: '/',
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: isIE,
  },
  system: {
    loggerOptions: {
      loggerCallback: (logLevel, message, containsPii) => {
        console.log(message);
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false
    }
  }
}

export const protectedResources = {
  todoItemsApi: {
    endpoint: "https://localhost:5001/api/TodoItems",
    scopes: [
      "https://zoo0mb2c.onmicrosoft.com/api/TodoItems.Read",
      "https://zoo0mb2c.onmicrosoft.com/api/TodoItems.Write"
    ],
  },
}
export const loginRequest = {
  scopes: []
};
