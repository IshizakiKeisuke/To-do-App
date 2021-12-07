import { BrowserCacheLocation, Configuration, LogLevel } from "@azure/msal-browser";


const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1; //ブラウザのなにか(ここから分からない)

export const b2cPolicies = {
  names: {
    signUpSignIn: "b2c_1_todo_signup_signin",
  },
  authorities: {
      signUpSignIn: {
      authority: "https://ritskztodob2c.b2clogin.com/ritskztodob2c.onmicrosoft.com/b2c_1_todo_signup_signin",
      }
  },
  authorityDomain: "ritskztodob2c.b2clogin.com"
};

export const msalConfig: Configuration = {
  auth: {
      clientId: '0997df26-a9ca-4055-a6c7-c74d05866f78', 
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
          loggerCallback(logLevel: LogLevel, message: string) {
              console.log(message);
          },
          logLevel: LogLevel.Verbose,
          piiLoggingEnabled: false
      }
  }
}

export const protectedResources = {
  todoListApi: {
    endpoint: "api/TodoItems", 
    scopes: ["https://ritskztodob2c.onmicrosoft.com/b0b9fde8-baf2-4812-868b-c28b911e5f3b/access_as_user"],
  },
}

export const loginRequest = { 
  scopes: ["https://ritskztodob2c.onmicrosoft.com/b0b9fde8-baf2-4812-868b-c28b911e5f3b/access_as_user"]
};
