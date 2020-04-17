'use strict';


/**
 * The discovery endpoint, also known as the \"well-known endpoint\" is a set of OpenID Connect properties, used by clients integrating against a OpenID authentication provider. The documents describes which claims, scopes, grant types and endpoints are to be used upon authentication.
 *
 * no response value expected for this operation
 **/
exports._well_knownOpenid_configurationGET = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * A JSON Web Key (JWK) is a standard method for representing a cryptographic key using JSON. The spec can be found here: https://tools.ietf.org/html/rfc7517.  The Integrator Authentication service signs all JWT access token with a private key. The public key can be obtained in the jwks endpoint to verify the authenticity of the access token.
 *
 * no response value expected for this operation
 **/
exports._well_knownOpenid_configurationJwksGET = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 *
 * Used when requesting an access token for onboarded integrator clients.
 *
 * authorization String Basic authorization scheme. A combination of your ClientId and Client Secret combined with a semicolon and encoded using base64urlencoding. ({Client_Id:Client_Secret}).toBase64UrlEncoding();
 * contentType String The request will have to be encoded using the x-www-urlencoded content type.
 * grant_type String Should be set to client_credentials. A grant_type of client_credentials is used in authentication context where's there's no direct end-user envolved, ex. server-to-server communication. Currently, client_credentials is the only grant_type supported by Integrator Authentication. Ex: client_credentials=grant_type
 * merchant_vat String VAT Number of the Merchant the integrator is integrating on behalf. It will be applied to the JWT access token, if supplied. We support FI and DK vat numbers. The vat number consists of country prefix (either FI or DK) and 8 digits. Ex: merchant_vat=DK12345678 (optional)
 * no response value expected for this operation
 **/
exports.connectTokenPOST = function(authorization,contentType,grant_type,merchant_vat) {
  return new Promise(function(resolve, reject) {
    var response = {
      access_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IkE5QTdBQ0NGMTg4NEQwMUQ0QUIwRkZEMTA0OTEyNEI3NEIxRThCQUQiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJxYWVzenhpRTBCMUtzUF9SQkpFa3Qwc2VpNjAifQ.eyJuYmYiOjE1ODY4NjQ1NTMsImV4cCI6MTU4Njk1MDk1MywiaXNzIjoiaHR0cHM6Ly9hcGkubW9iaWxlcGF5LmRrL2ludGVncmF0b3ItYXV0aGVudGljYXRpb24iLCJhdWQiOlsiaHR0cHM6Ly9hcGkubW9iaWxlcGF5LmRrL2ludGVncmF0b3ItYXV0aGVudGljYXRpb24vcmVzb3VyY2VzIiwiaW50ZWdyYXRvcl9zY29wZSJdLCJjbGllbnRfaWQiOiI0ODNkOWJiMS00YmE1LTQwNzEtYjQ2NC1kNzE4MzVmNjI3OTkiLCJpbnRlZ3JhdG9yX2lkIjoiZTdjOWIwNDAtZTAyMy00ZGQ5LTlmNDctZTc5ZWM1NDRhMjA0IiwiaW50ZWdyYXRvcl9uYW1lIjoiVmVyaWZvbmUiLCJpbnRlZ3JhdG9yY2xpZW50X25hbWUiOiJ2ZXJpZm9uZWdsb2JhbCIsInNjb3BlIjpbImludGVncmF0b3Jfc2NvcGUiXX0.nUNht9TX8Lt5fZMIdDPJ1ZuslxwlCx8bJEsUoPWfveA7fL4CHb9W7NC9eUIyv6koejRpyLibZ-FV2lu9FVPvtqjU_9pQVpt9LTj1449fsGar8JrnNKuQLQfQzihr50Tr9NEkRdIQd-n7VVE2SYynV9HlWjGdKty6jCNGWyFyDkfgisgldBr7dn_NxLtQ-sdzCRVojCE_1hsOmYqeIkUhCOYVIZCZyi_CkU6oGPvLzDhkLUIUAkX-flLcE3O_rCGPtatc--J4U4G0gN4wwjUG7RXUZdVg1mF0_ZFtIERkWdn8pYUxrHRaYzPuDQgx5f7PTmiAYQWZlhoLiYsP7r1gZg",
      expires_in: 600,
      token_type: "Bearer",
      scope: "integrator_scope"
    };
    resolve(response);
  });
}
