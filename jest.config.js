module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    "./js-cast-backend"
  ],
  "testMatch": [
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"  
  },
};