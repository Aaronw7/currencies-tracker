import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { GeoJSONFeature } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface Currency {
  code: string;
  rate: number;
}

interface MapProps {
  selectedCurrency: string;
  currencies: Currency[];
  previousCurrencies: Currency[];
}

interface Coordinates {
  mobile: [number, number];
  desktop: [number, number];
}

interface Zoom {
  mobile: number;
  desktop: number;
}

interface CurrencyConfig {
  center: Coordinates;
  zoom: Zoom;
}

interface Config {
  [key: string]: CurrencyConfig;
}

const currencyConfig: Config = {
  AUD: { center: { mobile: [120, -15], desktop: [90, -5] }, zoom: { mobile: 1, desktop: 1.7 } },
  BGN: { center: { mobile: [25, 45], desktop: [15, 50] }, zoom: { mobile: 2.5, desktop: 2.5 } },
  BRL: { center: { mobile: [-55, 10], desktop: [-60, 25] }, zoom: { mobile: 0.8, desktop: 1.8 } },
  CAD: { center: { mobile: [-85, 55], desktop: [-60, 45] }, zoom: { mobile: 1, desktop: 1.3 } },
  CHF: { center: { mobile: [25, 45], desktop: [12, 50] }, zoom: { mobile: 2.5, desktop: 2.8 } },
  CZK: { center: { mobile: [25, 45], desktop: [15, 50] }, zoom: { mobile: 2.5, desktop: 2.5 } },
  HRK: { center: { mobile: [25, 45], desktop: [15, 50] }, zoom: { mobile: 2.5, desktop: 2.5 } },
  USD: { center: { mobile: [-100, 40], desktop: [-35, 40] }, zoom: { mobile: 1, desktop: 1.5 } },
  // Default center and zoom
  default: { center: { mobile: [-35, 30], desktop: [-20, 20] }, zoom: { mobile: 0, desktop: 1 } }
};

const Map: React.FC<MapProps> = ({ selectedCurrency, currencies, previousCurrencies }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [layers, setLayers] = useState<{ id: string; color: string; hoverColor: string }[]>([]);

  console.log('selected currency: ', selectedCurrency);

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
      if (change >= 0.5) {
        color = '#53bc53';
        hoverColor = '#3e9e3e';
      } else if (change >= 0.01) {
        color = '#86cf72';
        hoverColor = '#65c24c';
      } else if (change <= -0.5) {
        color = '#df2334';
        hoverColor = '#b51a28';
      } else if (change <= -0.01) {
        color = '#cf7286';
        hoverColor = '#c24c65';
      }
      return {
        id: currency.code,
        color: color,
        hoverColor: hoverColor
      };
    });

    setLayers(newLayerColors);
  }, [currencies, previousCurrencies]);

  useEffect(() => {
    if (layers.length === 0 || !mapContainer.current) return;

    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const isMobile = window.innerWidth < rootFontSize * 48;

    const currencySettings = currencyConfig[selectedCurrency] || currencyConfig.default;
    const center = isMobile ? currencySettings.center.mobile : currencySettings.center.desktop;
    const zoom = isMobile ? currencySettings.zoom.mobile : currencySettings.zoom.desktop;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/aaronw7/clyxz7fdy009301r7el2m4bzl',
      center: center,
      zoom: zoom,
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
  }, [selectedCurrency, layers]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
};

export default Map;
