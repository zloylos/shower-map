modules.define('shower-map', [
    'shower',
    'util.extend'
], function (provide, shower, extend) {

    var MAP_ELEMENT = 'ymap',
        PLACEMARK_ELEMENT = 'placemark',
        BASE_API_PATH = 'https://api-maps.yandex.ru/',
        DEFAULT_MAP_OPTIONS = {
            center: [54, 32],
            zoom: 12
        },
        DEFAULT_API_OPTIONS = {
            version: '2.1',
            lang: 'ru_RU',
            mode: 'release'
        };

    /**
     * @class
     * @name ShowerMap
     * Shower plugin for make maps in presentation.
     * 
     * @param {Shower} shower
     * @param {object} [options]
     * @param {number[]} [options.center = [54, 32]]
     * @param {number} [options.zoom = 12] 
     * @param {object} [options.api]
     * @param {string} [options.api.version = '2.1']
     * @param {string} [options.api.mode = 'release']
     * 
     * @example
     * <ymap data-center="54.33, 45.33" data-zoom="12">
     *      <placemark data-coords="54, 23" />
     *      <placemark data-coords="52, 23" />
     * </ymap>
     *
     * @example
     * shower.options.plugins['shower-map'] = {
     *      api: {
     *          mode: 'debug'
     *      },
     *      center: [53, 23]
     * };
     * ……
     * <ymap />
     */
    function ShowerMap (shower, options) {
        options = options || {};
        options.api = options.api || {};

        this._shower = shower;

        this.options = extend({}, DEFAULT_MAP_OPTIONS, options);
        this.options.api = extend({}, DEFAULT_API_OPTIONS, options.api); 

        this._maps = [];
    }

    extend(ShowerMap.prototype, /** @lends ShowerMap.prototype */ {
        init: function () {
            this._initApi();
            ymaps.ready().then(this._initMaps, this);
        },

        /**
         * @returns {ymaps.Map[]}
         */
        getMaps: function () {
            return this._maps;
        },  

        _initApi: function () {
            var apiOptions = this.options.api,
                apiScriptPath = BASE_API_PATH + 
                    apiOptions.version + '/' +
                    '?lang=' + apiOptions.lang, 
                    '&mode=' + apiOptions.mode,
                apiScriptElement = document.createElement('script');

            document.body.appendChild(apiScriptElement);
            apiScriptElement.src = apiScriptPath;
        },

        _initMaps: function () {
            var elements = this._findMapElements();
            elements.forEach(this._initMap, this);
        },

        /**
         * @param {HTMLElement} mapElement
         */
        _initMap: function (mapElement) {
            var data = mapElement.dataset,
                center = data.center,
                zoom = data.zoom, 
                map;

            if (center) {
                center = parseCoord(center);
            }

            if (zoom) {
                zoom = parseInt(zoom);
            }

            map = this._maps.push(new ymaps.Map(mapElement, {
                zoom: zoom || this.options.zoom,
                center: center || this.options.center
            }));

            this._initPlacemarks();
        },

        /**
         * @param {ymaps.Map} map
         * @param {HTMLElement} container
         */
        _initPlacemarks: function (map, container) {
            var elements = this._findPlacemarkElements();
            elements.forEach(function () {
                this._initPlacemark(map, elem);
            }, this);
        },

        /**
         * @param {ymaps.Map} map
         * @param {HTMLElement} elem
         */
        _initPlacemark: function (map, elem) {
            var data = elem.dataset,
                coords = data.coords,
                balloonContent = data.balloon
                hintContent = data.hint;

            coords = parseCoord(coords);

            map.geoObject.add(new ymaps.Placemark(coords, {
                balloonContent: balloonContent,
                hintContent: hintContent
            }));
        },

        _findMapElements: function () {
            var showerContainerElement = shower.container.getElement(),
                mapElements = showerContainerElement.querySelectorAll(MAP_ELEMENT);

            return Array.prototype.slice.call(mapElements);
        },

        _findPlacemarkElements: function () {
            var elements = container.querySelectorAll(PLACEMARK_ELEMENT);
            return Array.prototype.slice(elements);
        }
    };

    /**
     * @param {string}
     * @return {number[]}
     */
    function parseCoord (coord) {
        coord = coord.split(',');
        coord.forEach(function (coord) {
            return parseFloat(coord.trim());
        });

        return coord;
    }

    provide(ShowerMap);
    shower.plugins.add('shower-map');
});