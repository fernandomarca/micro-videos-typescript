export default {
  displayName: {
    name: 'nestjs',
    color: 'magentaBright',
  },
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "@swc/jest"
  },
  collectCoverageFrom: [
    "**/*.(t|j)s"
  ],
  coverageProvider: "v8",
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    '@fm/micro\\-videos/(.*)$':
      '<rootDir>/../../../node_modules/@fm/micro-videos/dist/$1',
    //'#seedwork/domain': '<rootDir>/../../../node_modules/@fc/micro-videos/dist/@seedwork/domain/index.js',
    '#seedwork/(.*)$':
      '<rootDir>/../../../node_modules/@fm/micro-videos/dist/@seedwork/$1',
    //'#category/domain': '<rootDir>/../../../node_modules/@fc/micro-videos/dist/category/domain/index.js',
    '#category/(.*)$':
      '<rootDir>/../../../node_modules/@fm/micro-videos/dist/category/$1',
  },
}