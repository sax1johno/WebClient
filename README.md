# ProtonMail Web Client

Official AngularJS web client for the [ProtonMail secure email service](https://protonmail.com). ProtonMail also makes use of [OpenPGPjs](https://github.com/openpgpjs/openpgpjs) as our message cryptography is PGP compliant.

## Translation

We are currently working with our community to localize ProtonMail from English to most of the world's major languages. If you're interested in being part of this translation project, send us an email to contact@protonmail.ch with the subject line "ProtonMail Translation Project [Your Language]" and we will offer you more information about it.

## Basic Installation

> :warning: You must have node.js >= v6

- `$ npm install`
- `$ npm start`

### dependencies
  - Node.js >= v8
  - npm 5
  - git

### About npm install

This command will run as a hook postinstall,
  - `tasks/privateDependencies.sh`: Custom vendor

### Error with Mac

You need to install a few dep in order to be able to deploy
```sh
brew install libpng
```
> or `brew upgrade libpng` if you already have the lib

#### If you have docker, and prefer to not install node (or anything else) locally

- `make start` to start the app on a container (use `make localurl` to find the url where it's running)
- `make test` to build the app (actual tests are still to come)

There is a very good chance you won't be able to use the app locally because of various security headers and such. But you should be able to get the code running enough to poke around and inspect it.

We are still in Beta and will have a more refined build process, installation instructions, unit tests, and all that good stuff once we exit Beta.

## Development

We are very open to bug reports via Issues as well as Pull Requests.

### Custom command

```
$ npx appComponent
$ npm run create
```
cf [Component Generator](https://github.com/ProtonMail/componentGenerator)

## Deploy

1. Create a new version + tag => `$ npm version (patch|minor|major)`.
2. Deploy via npm `npm run deploy -- --api=X --branch=Y`.
    - `X` is the API version available in `API_TARGETS` in the `env/config.js` file
    - `Y` can be `deploy-dev`, `deploy-beta`, `deploy-prod-a` or `deploy-prod-b`.

Each `deploy-<NAME>` will be available at `<NAME>.protonmail.com`.

### CLI Flags

- `--branch` : Deploy branch dest
- `--api` : Set an API for the app (_dev, live, etc._)
- `--debug`: turn on debug mode for the command (default false)

## I18n à la demande

> We build i18n when we create a build for beta or prod

```sh
$ npm run i18n:build
```

It will do everything you need. Import new translations first for a better result ;)

## Release notes

### Extract markdown
*NOTE: In order to generate the release notes you need to set the `RELEASER_GH_TOKEN` environment variable.*

To generate release notes for the latest version (tag), run the following command:
```sh
$ npm run releaser:extract
```

To generate release notes for a specific version (tag), run:
```sh
$ npm run releaser:extract -- --tag v3.12.24
```

The release notes are outputted to `stdout`. Those notes have to be manually inserted to `CHANGELOG.md`.

It is also possible to run the following command to automatically unshift the output from releaser into `CHANGELOG.md`
```sh
$ npm run releaser:unshift
```

### Generate HTML file
The HTML file from the `CHANGELOG.md` file is automatically generated when running `start` or `dist`. It takes the markdown file and generates the HTML file at `${build}/assets/changelog.tpl.html` which will be dynamically fetched when the modal opens.


## Commit naming conventions
For a fix linked to an issue number:
- `(Fix|Close|Resolve) #ISSUENUMBER` (multiple allowed, separated by comma)

For a hotfix not linked to any issue:
- `Hotfix - Description`

Any commits that follow this convention will be included in the release notes generator.

For fixes linked to an issue, the description will be taken from GitHub and grouped according to if it has the `Bug` or `Feature` label.

For hotfixes, the description in the commit name will be included in the release notes under the group `Others`.


## Branch naming conventions

For a fix
- `fix/<your feature>`

For a feature
- `feat/<your feature>`
- or `feature/<your feature>`

## Tests

```shell
$ npm test
```

> To edit test it's better to run `$ npm run testwatch` (_tests with a watcher_)

## End to end testing for AngularJS

Installation:

```shell
$ npm install -g protractor
$ webdriver-manager update
```

Start up a Selenium Server:

```shell
$ webdriver-manager start
```

> To run selenium you can use docker if you don't want to install Java :
```sh
$ docker run -d -p 4444:4444 -v /dev/shm:/dev/shm selenium/standalone-chrome:2.53.0
```
cf [Selenium Docker](https://github.com/SeleniumHQ/docker-selenium)


Run tests:
```shell
$ npm run e2e -- --params.password1 "XXX" --params.password2 "XXX"
```
> default account is qatest123, you can change that using `--params.login "xxxx"`


```shell
$ npm run e2e
```

Run a scenario:

```shell
$ npm run e2e -- --suite=login
```

## License

Copyright (c) 2013-2016

Proton Technologies A.G. (Switzerland)

Email: contact@protonmail.ch

License: https://github.com/ProtonMail/WebClient/blob/public/license.md
