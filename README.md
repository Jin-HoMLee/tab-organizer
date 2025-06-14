# tab-organizer

## Package tab-organizer app to zip
Package the tab-organizer folder to zip for upload as a package to Chrome Web Store. 

MacOS Terminal: 
```bash
zip -r tab-organizer.zip tab-organizer
```

## Install imagemagick
Install imagemagick for various tasks for upload as a package to Chrome Web Store, e.g.:  
- converting icon from SVG to PNG 
- converting screenshots to 24-Bit-PNG (no alpha) 

MacOS Terminal: 
```bash
brew install imagemagick
```

## Convert screenshot to 1280 x 800 JPEG
Convert screenshots to 1280 x 800 JPEG file format for upload as a package to Chrome Web Store. 

MacOS Terminal: 
```bash
magick screenshot.png -resize 1280x800^ -gravity center -extent 1280x800 screenshot-1280x800.jpg
```