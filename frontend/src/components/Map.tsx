import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { GeoJSONFeature } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface Currency {
  code: string;
  rate: number;
}

interface MapProps {
  currencies: Currency[];
  previousCurrencies: Currency[];
}

const Map: React.FC<MapProps> = ({ currencies, previousCurrencies }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [layers, setLayers] = useState<{ id: string; color: string; hoverColor: string }[]>([]);

  useEffect(() => {
    const formatChange = (code: string) => {
      const currentRate = currencies.find(currency => currency.code === code)?.rate;
      const previousRate = previousCurrencies.find(currency => currency.code === code)?.rate;

      if (currentRate !== undefined && previousRate !== undefined) {
        const change = ((currentRate - previousRate) / previousRate) * 100;
        return change;
      }
      return 0;
    };

    const newLayerColors = currencies.map((currency) => {
      const change = formatChange(currency.code);
      let color = '#bdbdbd';
      let hoverColor = '#a3a3a3'
      if (change > 0.01) {
        color = '#86cf72',
        hoverColor = '#65c24c'
      } // Green for positive change
      else if (change < -0.01) {
        color = '#cf7286';
        hoverColor = '#c24c65'
      } // Red for negative change
      return {
        id: currency.code,
        color: color,
        hoverColor: hoverColor
      };
    });

    setLayers(newLayerColors);
  }, [currencies, previousCurrencies]);

  useEffect(() => {
    if (layers.length === 0 || map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/aaronw7/clyxz7fdy009301r7el2m4bzl',
      center: [-30, 30],
      zoom: 2,
      attributionControl: false,
    });

    map.current.on('load', () => {
      if (!map.current) return;

      layers.forEach((layer) => {
        if (!map.current) return;
        const layerId = layer.id;

        map.current.setPaintProperty(layerId, 'fill-color', layer.color);

        map.current.on('mouseenter', layerId, () => {
          if (!map.current) return;

          map.current.setPaintProperty(layerId, 'fill-color', layer.hoverColor);
          map.current.getCanvas().style.cursor = 'pointer';
        });

        map.current.on('mouseleave', layerId, (e) => {
          if (!map.current) return;

          const features = map.current.queryRenderedFeatures(e.point, {
            layers: layers.map(layer => layer.id)
          }) as GeoJSONFeature[];

          if (features.length > 0 && features[0].layer) {
            map.current.getCanvas().style.cursor = 'pointer';
          } else {
            map.current.getCanvas().style.cursor = 'grab';
          }

          map.current.setPaintProperty(layerId, 'fill-color', layer.color);
        });
      });
    });
  }, [layers]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
};

export default Map;
