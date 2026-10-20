export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Scopes are ticket IDs such as RBP-16, so upper case is allowed.
    'scope-case': [0],
    // Subjects often start with an acronym (CI, ESLint, JSON-LD), which subject-case reads as sentence case.
    'subject-case': [0],
    // A squash merge adds ' (#123)' to the title and '* ' to each squashed subject in
    // the body. 90 leaves room for both under the 100 limit that release PRs check.
    'header-max-length': [2, 'always', 90],
    // config-conventional types, plus release for dev to main PR titles (release: <date>: <summary>).
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'release',
        'revert',
        'style',
        'test',
      ],
    ],
  },
};
