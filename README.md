# Amplify Cognito Promises

![CircleCI](https://img.shields.io/circleci/build/github/jacobsidford/amplify-cognito-promises?style=plastic)

The Amplify library by AWS is a nice little library for handling user management via Cognito, but every request requires a callback.
Amplify Cognito Promises wraps (eventually)many of the normal user flow calls in a Promise, allowing you to easily handle these with async/await
instead of callbacks.

This library still requires you to use the original Amplify for Cognito objects which are passed in.

## Install

```
$ npm install amplify-cognito-promises
```

## Usage
