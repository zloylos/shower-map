# Maps plugin for Shower v2

![screenshot](http://zloy.me/other/imgs/shower-map.png)

Shower plugin for show maps (with placemarks) in presentation.
Based on the JS API Yandex.Maps (ru: http://tech.yandex.ru/maps/, en: https://api.yandex.com/maps/doc/jsapi/)

## install

``` npm i --save shower-map```

And include file shower-map.js from node_modules/shower-map folder.

## how to use
### map

```(html)
<ymap data-center="55.755768, 37.617671" data-zoom="15"></ymap>
```

**Default plugin options for map:**
- *{string|number} width* = "100%"
- *{string|number} height* = "80%"
- *{number} zoom* = 15
- *{string} mapType* = "yandex#map"
- *{string} controls* = "smallMapDefaultSet"
- *{string} placemarkIconColor

### placemarks

For init new placemark you need his position into geo coords. Placemark must be located into ymap tag.

```(html)
<ymap data-center="55.755768, 37.617671">
	<placemark data-coords="55.755768, 37.617671" />
</ymap>
```

**Options for placemarks:**
- *{string} coords*
- *{string} balloon* Balloon content.
- *{string} hint* Hint content.
- *{string} color* Placemark icon color.

### example

```(html)
<ymap data-center="55.755768, 37.617671" data-zoom="10" data-width="350px" data-height="350px">
	<placemark data-coords="55.75, 37.61" data-hint="Test" />
    <placemark data-coords="55.71, 37.62" data-color="#ff0000" />
    <placemark data-coords="55.9, 37.64" data-balloon="Test" />
</ymap>
```
