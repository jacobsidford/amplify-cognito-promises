import {
  AuthenticationDetails,
  CognitoRefreshToken,
  CognitoUser,
  CognitoUserSession,
  ClientMetadata,
} from "amazon-cognito-identity-js";

export interface IAsyncCognitoUser {
  authenticateUser(
    cognitoUser: CognitoUser,
    cognitoAuthenticationDetails: AuthenticationDetails
  ): Promise<CognitoUserSession>;

  confirmRegistration(
    cognitoUser: CognitoUser,
    confirmationCode: string,
    forceAliasCreation: boolean,
    clientMetadata: ClientMetadata
  ): Promise<string>;

  refreshSession(
    cognitoUser: CognitoUser,
    refreshToken: CognitoRefreshToken,
    clientMetadata: ClientMetadata
  ): Promise<CognitoUserSession>;
}

export class AsyncCognitoUser implements IAsyncCognitoUser {
  /**
   * Method for authenticating the user.
   * @param {CognitoUser} CognitoUser CognitoUser object
   * @param {AuthenticationDetails} authDetails Contains the authentication data
   * @returns {Promise} Promise object representing CognitoUserSession
   */
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

  /**
   * This is used for a certain user to confirm the registration by using a confirmation code
   * @param {CognitoUser} CognitoUser CognitoUser object
   * @param {string} confirmationCode Code entered by user.
   * @param {bool} forceAliasCreation Allow migrating from an existing email / phone number.
   * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
   * @returns {Promise} Promise object representing registration success
   */
  confirmRegistration = (
    cognitoUser: CognitoUser,
    confirmationCode: string,
    forceAliasCreation: boolean,
    clientMetadata: ClientMetadata
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(
        confirmationCode,
        forceAliasCreation,
        (err, result) => (err ? reject(err) : resolve(result)),
        clientMetadata
      );
    });

  /**
   * This uses the refreshToken to retrieve a new session
   * @param {CognitoUser} CognitoUser CognitoUser object
   * @param {CognitoRefreshToken} refreshToken A previous session's refresh token.
   * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
   * @returns {Promise} Promise object representing CognitoUserSession
   */
  refreshSession = (
    cognitoUser: CognitoUser,
    refreshToken: CognitoRefreshToken,
    clientMetadata: ClientMetadata
  ): Promise<CognitoUserSession> =>
    new Promise((resolve, reject) =>
      cognitoUser.refreshSession(
        refreshToken,
        (err, result) => (err ? reject(err) : resolve(result)),
        clientMetadata
      )
    );
}
