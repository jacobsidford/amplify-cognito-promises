const { AsyncCognitoUserPool } = require('amplify-cognito-promises');

describe('AsyncCognitoUser', () => {
	test('Should instantiate', () => {
		const userpool = new AsyncCognitoUserPool();
		expect(userpool).toBeTruthy();	
	});
});
