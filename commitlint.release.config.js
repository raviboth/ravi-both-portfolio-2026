// Release PRs (dev to main) lint squash commits written by GitHub. GitHub adds ' (#123)'
// to the header and builds the body from the squashed commits (including merge-commit
// subjects, which commitlint ignores at authoring). Authored lines were checked on their
// own PRs, so this allows the header suffix and skips body and footer line length.
export default {
  extends: ['./commitlint.config.js'],
  rules: {
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [0],
    'footer-max-line-length': [0],
  },
};
