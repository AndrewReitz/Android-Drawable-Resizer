# Android Drawable Resizer
Resize android assets for XHDPI, HDPI, and MDPI quick and fast and right in your browser!

## Features
- Resize multiple Android Assets at once
- Downloads folder in a zip file that can be unzipped right in the project
- Uses browser to do all the hard work, can be used on local machine without any web server

###### Currently does not support 9 patches and works best sizing down not up

## Features comming soon
- Better resizing algorithms
- 9 Patch support
- CSS for the site

## Development
### Required for development
nodejs, bower, grunt-cli

### Setup
- npm install -g bower
- npm install -g grunt-cli
- npm install
- bower install

### Grunt Commands
- build - runs jshint, if successful builds the release build.  These files can be published to a website.
- clean - deletes all the files generated from Release
- jshint - runs jshint on the src and test files of this project
- watch - watches files in project, whenever one changes build is run
