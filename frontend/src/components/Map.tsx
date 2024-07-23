import React, { useRef, useEffect } from 'react';
import mapboxgl, { GeoJSONFeature } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

const currencyAbbreviations = [
  'AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR'
];

const Map = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/aaronw7/clyxz7fdy009301r7el2m4bzl',
      center: [-30, 30],
      zoom: 2,
      attributionControl: false,
    });

    map.current.on('load', () => {
      if (!map.current) return;

      currencyAbbreviations.forEach((currency) => {
        if (!map.current) return;
        const layerId = currency;

        map.current.on('mouseenter', layerId, () => {
          if (!map.current) return;
          console.log()

          map.current.setPaintProperty(layerId, 'fill-color', '#438731');
          map.current.getCanvas().style.cursor = 'pointer';
        });

        map.current.on('mouseleave', layerId, (e) => {
          if (!map.current) return;

          const features = map.current.queryRenderedFeatures(e.point, {
            layers: currencyAbbreviations
          }) as GeoJSONFeature[];

          if (features.length > 0 && features[0].layer) {
            map.current.getCanvas().style.cursor = 'pointer';
          } else {
            map.current.getCanvas().style.cursor = 'grab';
          }

          map.current.setPaintProperty(layerId, 'fill-color', '#86cf72');
        });

      });
    });

  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
};

export default Map;
