#!/bin/bash

# ImageMagick 7.1.1-43

PNG=$(mktemp XXXXXXXXX.png)

convert -background none -density 96 static/icons/key.svg -resize 64x64 $PNG
convert $PNG static/favicon.ico
rm $PNG

PNG=$(mktemp XXXXXXXXX.png)

convert -background white -density 96 static/icons/key.svg -resize 256x256 $PNG
mv $PNG static/img/key.png
