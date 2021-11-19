# CPH Scorer
![](https://img.shields.io/badge/Lerna-3.22.0-purple)
![](https://img.shields.io/badge/Node-16-yellowgreen?logo=node.js)
![](https://img.shields.io/badge/Yarn-1.22.0-blue?logo=yarn)
![](https://img.shields.io/badge/TypeScript-4.0.0-blue?logo=typeScript)
![](https://img.shields.io/badge/postgreSQL-13.0.0-blue?logo=postgreSQL)
![](https://img.shields.io/badge/bootstrap-5.0.0-purple?logo=bootstrap)
![](https://img.shields.io/badge/alpinejs-3.0.0-green?logo=alpine.js)

[![CI pipeline](https://github.com/corentin-verquin/cphScorer/actions/workflows/ContinuousIntegration.yml/badge.svg)](https://github.com/corentin-verquin/cphScorer/actions/workflows/ContinuousIntegration.yml)
[![codecov](https://codecov.io/gh/corentin-verquin/cphScorer/branch/develop/graph/badge.svg?token=GJAQF8DM3Y)](https://codecov.io/gh/corentin-verquin/cphScorer)
![version](https://img.shields.io/github/v/release/corentin-verquin/cphScorer)
![license MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcorentin-verquin%2FcphScorer.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcorentin-verquin%2FcphScorer?ref=badge_shield)
## Prerequistes
- node >= 16.0.0
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

# Test packages
make test

# End to end test (need browser target chrome or firefox)
make e2e-test
# example make e2e-test BROWSER=chrome

# Rebuild custom psql image 
rebuild-image
```

## Graph dependencies
![](https://raw.githubusercontent.com/corentin-verquin/cphScorer/.github/graph-dependencies.png)


## Author
**Corentin Verquin**
- Github [@corentin-verquin](https://github.com/corentin-verquin)

## License
Copyright © `2021` `Corentin Verquin`.
This project is [MIT](https://opensource.org/licenses/MIT) licensed

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcorentin-verquin%2FcphScorer.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcorentin-verquin%2FcphScorer?ref=badge_large)