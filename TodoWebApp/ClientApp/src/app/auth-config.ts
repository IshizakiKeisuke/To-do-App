import { BrowserCacheLocation, Configuration, LogLevel } from "@azure/msal-browser";

/*msalConfig /終了
loginRequest
protectedResources*/

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1; //ブラウザのなにか(ここから分からない)

export const b2cPolicies = {
  names: {
      signUpSignIn: "b2c_1_susi_v2",
      editProfile: "b2c_1_edit_profile_v2"
  },
  authorities: {
      signUpSignIn: {
          authority: "https://ritskztodob2c.b2clogin.com/ritskztodob2c.onmicrosoft.com/b2c_1_susi_v2",
      },
      editProfile: {
          authority: "https://ritskztodob2c.b2clogin.com/ritskztodob2c.onmicrosoft.com/b2c_1_edit_profile_v2"
      }
  },
  authorityDomain: "ritskztodob2c.b2clogin.com"
};

export const msalConfig: Configuration = {
  auth: {
      clientId: '67f22baf-40ae-457e-b9f6-760a03a7ac1b', // This is the ONLY mandatory field that you need to supply.
      authority: b2cPolicies.authorities.signUpSignIn.authority, // Defaults to "https://login.microsoftonline.com/common"
      knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
      redirectUri: '/', // Points to window.location.origin. You must register this URI on Azure portal/App Registration.
  },
  cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
      storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge
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
    endpoint: "https://localhost:44319/api/todolist", //https://localhost:44351がいらない可能性・無い場合は相対評価になる。
    scopes: [],
  },
}

export const loginRequest = { //いらない可能性あり
  scopes: []
};