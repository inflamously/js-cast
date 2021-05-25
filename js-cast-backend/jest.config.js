module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ["."],
  "testMatch": [
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    '^.+\\.(ts|tsx)?$': 'ts-jest'
  },
};