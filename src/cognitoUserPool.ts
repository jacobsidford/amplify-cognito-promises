import {
  CognitoUserPool,
  CognitoUserAttribute,
  ISignUpResult,
  ClientMetadata,
} from "amazon-cognito-identity-js";

export interface IAsyncCognitoUserPool {
  registerUser(
    userPool: CognitoUserPool,
    username: string,
    password: string,
    attributes: CognitoUserAttribute[],
    validationData: CognitoUserAttribute[],
    clientMetadata: ClientMetadata
  ): Promise<ISignUpResult>;
}

export class AsyncCognitoUserPool implements IAsyncCognitoUserPool {
  /**
   * @typedef {object} SignUpResult
   * @property {CognitoUser} user New user.
   * @property {bool} userConfirmed If the user is already confirmed.
   */
  /**
   * method for signing up a user
   * @param {CognitoUserPool} UserPool
   * @param {string} username User's username.
   * @param {string} password Plain-text initial password entered by user.
   * @param {(AttributeArg[])=} userAttributes New user attributes.
   * @param {(AttributeArg[])=} validationData Application metadata.
   * @param {(AttributeArg[])=} clientMetadata Client metadata.
   * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
   * @returns {Promise} Promise object representing SignUpResult
   */
  registerUser = (
    userPool: CognitoUserPool,
    username: string,
    password: string,
    attributes: CognitoUserAttribute[],
    validationData: CognitoUserAttribute[],
    clientMetadata: ClientMetadata
  ): Promise<ISignUpResult> =>
    new Promise((resolve, reject) => {
      userPool.signUp(
        username,
        password,
        attributes,
        validationData,
        (err, result) => (err ? reject(err) : resolve(result)),
        clientMetadata
      );
    });
}
