# mygen-ts

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![npm download][download-image]][download-url]

Scaffold a simple Typescript project.

```
npm i mygen-ts -g
```

Scaffold looks like this:

```bash
.
├── .config
│   ├── .eslintrc.json
│   ├── .prettierrc.json
│   ├── tsconfig.cjs.json
│   ├── tsconfig.esm.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── .github
│   └── workflows
│       ├── nodejs.yml
│       ├── release.yml
│       └── typedoc.yml
├── .gitignore
├── LICENSE
├── package.json
├── README.md
└── src
    ├── index.test.ts
    └── index.ts
```

---

[MIT LICENSE](https://github.com/newseru/mygen-ts/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/mygen-ts.svg
[npm-url]: https://www.npmjs.com/package/mygen-ts
[ci-image]: https://github.com/newseru/mygen-ts/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/newseru/mygen-ts/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/mygen-ts.svg
[download-url]: https://www.npmjs.com/package/mygen-ts
