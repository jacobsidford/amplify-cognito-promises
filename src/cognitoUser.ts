import {
  AuthenticationDetails,
  CognitoRefreshToken,
  CognitoUser,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

export interface IAsyncCognitoUser {
  authenticateUser(
    cognitoUser: CognitoUser,
    cognitoAuthenticationDetails: AuthenticationDetails
  ): Promise<CognitoUserSession>;

  confirmRegistration(
    cognitoUser: CognitoUser,
    verificationCode: string
  ): Promise<string>;

  renewToken(
    cognitoUser: CognitoUser,
    refreshToken: CognitoRefreshToken
  ): Promise<CognitoUserSession>;
}

export class AsyncCognitoUser implements IAsyncCognitoUser {
  authenticateUser = (
    cognitoUser: CognitoUser,
    cognitoAuthenticationDetails: AuthenticationDetails
  ): Promise<CognitoUserSession> =>
    new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(cognitoAuthenticationDetails, {
        onSuccess: resolve,
        onFailure: reject,
        newPasswordRequired: reject,
      });
    });

  confirmRegistration = (
    cognitoUser: CognitoUser,
    verificationCode: string
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(verificationCode, true, (err, result) =>
        err ? reject(err) : resolve(result)
      );
    });

  renewToken = (
    cognitoUser: CognitoUser,
    refreshToken: CognitoRefreshToken
  ): Promise<CognitoUserSession> =>
    new Promise((resolve, reject) =>
      cognitoUser.refreshSession(refreshToken, (err, result) =>
        err ? reject(err) : resolve(result)
      )
    );
}
