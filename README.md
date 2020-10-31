### Video streaming

## Legal Issues
* Using HTTPS encryption legally requires NOLA Church to annually report and file paperwork.
* Pass any HTTPS requests through httpsToHttps and don't hardcode HTTPS calls

## Local install (MacOS only)
* Clone repo: `git clone git@github.com/jerrolb/video-streaming`
* Go to repo: `cd video-streaming`
* Run `npm install`
  > Requires Node.js: `nodejs.org`
* Go to ios folder: `cd ios`
* Run `pod install`
  > Requires cocoapods: `gem install cocoapods`
* Make sure `homebrew` is installed and run `homebrew install watchman`
* NOTE: If you ever encounter `too many open files` error, consider changing line 155 of `video-streaming/node_modules/sane/src/node_watcher.js` from `if (this.watched[dir]) {` to `if (this.watched[dir] || dir.includes('node_modules')) {`.

## Launch app (MacOS only)
  * Open `video-streaming/ios/nolachurch.xcworkspace` in Xcode
  * Press `Build and Run`
  * OR from root of project...
  * Run `react-native run-ios --simulator "Apple TV" --scheme "nolachurch-tvOS"`
    > Requires React Native CLI: `npm i -g @react-native-community/cli`

## For React Native 63.1.1
* In node_modules/react-native/Libraries/Image/RCTUIImageViewAnimated.m

>#pragma mark - CALayerDelegate
>
>- (void)displayLayer:(CALayer *)layer
>{
>  if (_currentFrame) {
>    layer.contentsScale = self.animatedImageScale;
>    layer.contents = (__bridge id)_currentFrame.CGImage;
> } else {
>   [super displayLayer:layer];
> }
>}