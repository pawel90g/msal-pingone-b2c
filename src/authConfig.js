/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */

export const identityProvider = {
    tenant: {
        name: 'garbacp'
    },
    usePingOne: true,
    ping: {
        clientId: "215f6902-077e-4fd4-894b-a1167ccf66be",
        policiesNames: {
            signUpSignIn: "b2c_1_pingone_signup_signin",
            forgotPassword: "b2c_1_reset",
            editProfile: "b2c_1_edit_profile"
        }
    },
    b2c: {
        clientId: "bb833e2b-4617-4012-8f0b-a124bea322d0",
        policiesNames: {
            signUpSignIn: "b2c_1_signin",
            forgotPassword: "b2c_1_reset",
            editProfile: "b2c_1_edit_profile"
        }
    }
}

export const b2cPoliciesNames = {
    signUpSignIn: identityProvider.usePingOne
        ? identityProvider.ping.policiesNames.signUpSignIn
        : identityProvider.b2c.policiesNames.signUpSignIn,
    forgotPassword: identityProvider.usePingOne
        ? identityProvider.ping.policiesNames.forgotPassword
        : identityProvider.b2c.policiesNames.forgotPassword,
    editProfile: identityProvider.usePingOne
        ? identityProvider.ping.policiesNames.editProfile
        : identityProvider.b2c.policiesNames.editProfile,
}

export const b2cPolicies = {
    authorityDomain: `${identityProvider.tenant.name}.b2clogin.com`,
    authorities: {
        signUpSignIn: {
            authority: `https://${identityProvider.tenant.name}.b2clogin.com/${identityProvider.tenant.name}.onmicrosoft.com/${b2cPoliciesNames.signUpSignIn}`,
        },
        forgotPassword: {
            authority: `https://${identityProvider.tenant.name}.b2clogin.com/${identityProvider.tenant.name}.onmicrosoft.com/${b2cPoliciesNames.forgotPassword}`,
        },
        editProfile: {
            authority: `https://${identityProvider.tenant.name}.b2clogin.com/${identityProvider.tenant.name}.onmicrosoft.com/${b2cPoliciesNames.editProfile}`
        }
    }
}

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig = {
    auth: {
        clientId: identityProvider.usePingOne
            ? identityProvider.ping.clientId
            : identityProvider.b2c.clientId, // This is the ONLY mandatory field that you need to supply.
        authority: identityProvider.usePingOne
            ? b2cPolicies.authorities.signUpSignIn.authority
            : "https://login.microsoftonline.com/9f5749d2-1a60-4dbd-981c-ae949f54a23d",//b2cPolicies.authorities.signUpSignIn.authority, // Choose SUSI as your default authority.
        knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
        redirectUri: '/',
        postLogoutRedirectUri: window.location.origin, // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: true, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
    apiHello: {
        endpoint: "https://apimgmt20220824.azure-api.net/weather/WeatherForecast",
        scopes: [`https://garbacp.onmicrosoft.com/${identityProvider.usePingOne ? identityProvider.ping.clientId : identityProvider.b2c.clientId}/Weather.Read`], // e.g. api://xxxxxx/access_as_user
    },
}

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: [...protectedResources.apiHello.scopes]
};
