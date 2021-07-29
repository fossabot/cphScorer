# CPH Scorer
![](https://img.shields.io/badge/License-MIT-yellow.svg)
![](https://img.shields.io/badge/Lerna-3.22.0-purple)
![](https://img.shields.io/badge/Node-14.15.0-yellowgreen?logo=node.js)
![](https://img.shields.io/badge/Yarn-1.22.0-blue?logo=yarn)
![](https://img.shields.io/badge/TypeScript-4.1.5-blue?logo=typeScript)
![](https://img.shields.io/badge/postgreSQL-13.0.0-blue?logo=postgreSQL)

[![codecov](https://codecov.io/gh/corentin-verquin/cphScorer/branch/develop/graph/badge.svg?token=GJAQF8DM3Y)](https://codecov.io/gh/corentin-verquin/cphScorer)

## Prerequistes
- node >= 14.15.0
- yarn >= 1.22.0
- lerna >= 3.22.1

## Install
```bash
lerna bootstrap
```

## Usage
```bash
# Launch postgresql container
make
# or
make up-dev-env

# Set up data base with test data
make import

# Stop postgresql container
make down-dev-env

# Enter in postgresql container
make connect-db

# Format packages
make format

# Compile packages
make compile
```

## Run tests
```bash
make test
```

## Graph dependencies
![](https://raw.githubusercontent.com/corentin-verquin/cphScorer/ghpage/graph-dependencies.png)


## Author
**Corentin Verquin**
- Github [@corentin-verquin](https://github.com/corentin-verquin)

## License
Copyright © `2021` `Corentin Verquin`.
This project is [MIT](https://opensource.org/licenses/MIT) licensed