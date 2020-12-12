### NOLA Church Apple TV app

## Legal Issues
* Using HTTPS encryption legally requires NOLA Church to annually report and file paperwork.
* Pass any HTTPS requests through httpsToHttps and don't hardcode HTTPS calls

## Local install (MacOS only)
* Clone repo: `git clone git@github.com/nolachurch/appletv`
* Go to repo: `cd appletv`
* Run `npm install`
  > Requires Node.js: `nodejs.org`
* Go to ios folder: `cd ios`
* Run `pod install`
  > Requires cocoapods: `gem install cocoapods`
* Make sure `homebrew` is installed and run `homebrew install watchman`

## Launch app (MacOS only)
  * Open `appletv/ios/nolachurch.xcworkspace` in Xcode
  * Press `Build and Run`
  * OR run `npm run ios` from root of project
    > Requires React Native CLI: `npm i -g @react-native-community/cli`