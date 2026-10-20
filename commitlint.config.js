export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Scopes are ticket IDs such as RBP-16, so upper case is allowed.
    'scope-case': [0],
  },
};
