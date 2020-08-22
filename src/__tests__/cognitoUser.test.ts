const { AsyncCognitoUser } = require('amplify-cognito-promises');

describe('AsyncCognitoUser', () => {
	test('Should instantiate', () => {
		const user = new AsyncCognitoUser();
		expect(user).toBeTruthy();	
	});
});
