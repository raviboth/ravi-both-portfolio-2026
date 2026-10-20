// Release PRs (dev to main) lint squash commits written by GitHub, which add ' (#123)'
// to the header. Authors are held to 90 by commitlint.config.js; this allows the suffix.
export default {
  extends: ['./commitlint.config.js'],
  rules: {
    'header-max-length': [2, 'always', 100],
  },
};
