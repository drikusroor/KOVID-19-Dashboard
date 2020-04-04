const tasks = (arr) => arr.join(' && ')

module.exports = {
  hooks: {
    'pre-commit': tasks([
      'cd public && cd COVID-19 && git pull && cd ../..',
      'git add .',
      'yarn && yarn build',
    ]),
  },
}
