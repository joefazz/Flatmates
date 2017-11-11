# Flatmates

## Introduction

Hello,

If you're reading this that means this project has developed to the point where people other than myself can work on it which is great!

To get started take a read through [these docs](https://github.com/joefazz/flatmates/Docs/CRNA.md) so you can understand some of the tech and scripts that we use for testing, deployment, adding packages etc.

This app is built with a lot of beta technologies which will undoubtably require updating once every month or so, the most core libs that we use and the places you will find yourself spending a lot of time visiting the docs of are:

- [React Native](https://facebook.github.io/react-native/)
- [React](https://reactjs.org/)
- [Expo](https://expo.io)
- [Redux](https://redux.js.org)
- [Redux Saga](https://redux-saga.js.org/)
- [Immutable](https://facebook.github.io/immutable-js)
- [React Navigation](https://reactnavigation.org)

Familiarity with these is important and if you need any help on any of them ping [me](mailto:joseph@fazzino.net) and I have a stash of articles in my Pocket.

## Set-Up

Set up is fairly straight forward, if you have an Android device you need only install Android Studio for testing other screen sizes etc and Xcode for iPhone dev. The reverse is true of iPhone users however you will need to install Xcode irregardless as it uses the Xcode build tools to compile the app.

Any IDE will work that can handle normal JavaScript coding. I personally recommend [VSCode](https://code.visualstudio.com/) as it has some handy React Native plugins that will help your development (especially [this one](https://github.com/Microsoft/vscode-react-native)). If you want to use something else like [Atom](https://ide.atom.io) you will have to do your own research on setting up your development environment.

Any git tool you want is fine, I use SourceTree but it's certainly not out of joy or pleasure, I find myself commiting more from VSCode nowadays.

Clone the repo and get hacking!

### Git Flow
A little aside here about how the repo is organised.

- MASTER: Current prod release PRs here should only be from hotfix
- DEVELOPMENT: Edge testing (rarely used)
- HOTFIX: Fixes for prod issues that are merged directly to master.
- FEATURE: Feature additions/changes/removals are to be done here, they are merged to a release for testing
- RELEASE: Where test builds get deployed from, this is where PRs from feature are to be made to

## Conventions

VSCode lets you insert a tab as 4 spaces which is how I choose to live my life so either 1 tab or 4 spaces.

I don't care about semicolons, I find myself entering them out of habit and adding them to missing lines when I notice them but it really doesn't bother me.

Comment your code (I shouldn't have to explain this but well documented code makes sure that PRs are merged faster and understanding can be shared between all developers)
