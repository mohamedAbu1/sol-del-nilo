import csrf from 'csrf';

const tokens = new csrf();

export function generateCsrfToken(secret) {
  return tokens.create(secret);
}

export function verifyCsrfToken(secret, token) {
  return tokens.verify(secret, token);
}