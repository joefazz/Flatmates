# Flatmates

## Introduction

Hello,

If you're reading this that means this project has developed to the point where people other than myself can work on it which is great!

This app is built with a lot of beta technologies which will undoubtably require updating once every month or so, the most core libs that we use and the places you will find yourself spending a lot of time visiting the docs of are:

- [React Native](https://facebook.github.io/react-native/)
- [React Native FBSDK](https://github.com/facebook/react-native-fbsdk)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org)
- [Redux Saga](https://redux-saga.js.org/)
- [Immutable](https://facebook.github.io/immutable-js)
- [React Navigation](https://reactnavigation.org)
- [GraphQL](http://graphql.org/)
- [GraphCool](https://graph.cool)
- [Apollo](https://www.apollographql.com/)

Familiarity with these is important and if you need any help on any of them ping [me](mailto:joseph@fazzino.net) and I have a stash of articles in my Pocket.

## Set-Up

You must install Android Studio in order to build for Android whether or not you have an Android device or want to use the emulator. You will need to install Xcode as it uses the Xcode build tools to compile the app.

After you run yarn for the first time you must go into node_modules/react-native-fbsdk/android/build/src/build.gradle and change line

compile('com.facebook.android:facebook-android-sdk:4.+')
with
compile('com.facebook.android:facebook-android-sdk:4.22.1')

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
