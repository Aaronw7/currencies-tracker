import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { GeoJSONFeature } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box } from '@chakra-ui/react';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface Currency {
  code: string;
  rate: number;
}

interface Layer {
  id: string;
  color: string;
  hoverColor: string;
  change: string;
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
  CHF: { center: { mobile: [10, 50], desktop: [12, 50] }, zoom: { mobile: 2.5, desktop: 2.8 } },
  CNY: { center: { mobile: [120, 30], desktop: [90, 35] }, zoom: { mobile: 1, desktop: 1.7 } },
  CZK: { center: { mobile: [15, 50], desktop: [15, 50] }, zoom: { mobile: 2.5, desktop: 2.5 } },
  DKK: { center: { mobile: [-5, 55], desktop: [-10, 50] }, zoom: { mobile: 1.2, desktop: 2 } },
  EUR: { center: { mobile: [15, 50], desktop: [-10, 50] }, zoom: { mobile: 1, desktop: 1.2 } },
  GBP: { center: { mobile: [-5, 55], desktop: [-10, 50] }, zoom: { mobile: 1.2, desktop: 1.9 } },
  HKD: { center: { mobile: [115, 20], desktop: [110, 23] }, zoom: { mobile: 3, desktop: 4 } },
  HRK: { center: { mobile: [20, 45], desktop: [15, 45] }, zoom: { mobile: 2.5, desktop: 2.5 } },
  HUF: { center: { mobile: [20, 47], desktop: [16, 47] }, zoom: { mobile: 3.1, desktop: 3.1 } },
  IDR: { center: { mobile: [120, 0], desktop: [95, 5] }, zoom: { mobile: 1, desktop: 1.3 } },
  ILS: { center: { mobile: [30, 35], desktop: [27, 42] }, zoom: { mobile: 3, desktop: 3.5 } },
  INR: { center: { mobile: [65, 35], desktop: [70, 30] }, zoom: { mobile: 1, desktop: 1.5 } },
  ISK: { center: { mobile: [-5, 55], desktop: [-10, 50] }, zoom: { mobile: 1.2, desktop: 2 } },
  JPY: { center: { mobile: [125, 40], desktop: [110, 30] }, zoom: { mobile: 2, desktop: 2 } },
  KRW: { center: { mobile: [125, 37], desktop: [110, 30] }, zoom: { mobile: 2, desktop: 2 } },
  MXN: { center: { mobile: [-90, 27], desktop: [-35, 27] }, zoom: { mobile: 1, desktop: 1.5 } },
  MYR: { center: { mobile: [120, 0], desktop: [95, 5] }, zoom: { mobile: 1, desktop: 1.6 } },
  NOK: { center: { mobile: [-5, 55], desktop: [-10, 50] }, zoom: { mobile: 1.2, desktop: 2 } },
  NZD: { center: { mobile: [125, -17], desktop: [115, -7] }, zoom: { mobile: 1, desktop: 1.7 } },
  PHP: { center: { mobile: [130, 0], desktop: [95, 5] }, zoom: { mobile: 1, desktop: 1.6 } },
  PLN: { center: { mobile: [20, 50], desktop: [15, 50] }, zoom: { mobile: 2.5, desktop: 2.5 } },
  RON: { center: { mobile: [22, 50], desktop: [15, 50] }, zoom: { mobile: 2, desktop: 2.5 } },
  RUB: { center: { mobile: [50, 50], desktop: [55, 45] }, zoom: { mobile: 1, desktop: 1 } },
  SEK: { center: { mobile: [22, 55], desktop: [15, 55] }, zoom: { mobile: 1.3, desktop: 2 } },
  SGD: { center: { mobile: [110, 5], desktop: [105, 0] }, zoom: { mobile: 3, desktop: 3 } },
  THB: { center: { mobile: [110, 15], desktop: [105, 10] }, zoom: { mobile: 1.2, desktop: 2.2 } },
  TRY: { center: { mobile: [30, 45], desktop: [20, 45] }, zoom: { mobile: 2.3, desktop: 2.5 } },
  USD: { center: { mobile: [-80, 35], desktop: [-35, 40] }, zoom: { mobile: 1, desktop: 1.3 } },
  ZAR: { center: { mobile: [-5, 0], desktop: [20, 25] }, zoom: { mobile: 1, desktop: 1 } },
  // Default center and zoom
  default: { center: { mobile: [-35, 30], desktop: [-20, 20] }, zoom: { mobile: 0, desktop: 1 } }
};

const Map: React.FC<MapProps> = ({ selectedCurrency, currencies, previousCurrencies }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [layers, setLayers] = useState<Layer[]>([]);
  const popupRef = useRef<mapboxgl.Popup | null>(null);

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

    const displayChange = (change: number) => {
      if (change < 0 && change > -0.005) {
        return "0.00";
      }
      return change.toFixed(2);
    }

    const newLayerColors = currencies.map((currency) => {
      const change = Number(displayChange(formatChange(currency.code)));
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
        hoverColor: hoverColor,
        change: `${displayChange(change)}%`
      };
    });

    setLayers(newLayerColors);
  }, [currencies, previousCurrencies]);

  useEffect(() => {
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
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
          if (popupRef.current) {
            popupRef.current.remove();
            popupRef.current = null;
          }
        });

        map.current.on('click', layerId, (e) => {
          if (!map.current) return;
          const features = e.features as GeoJSONFeature[];
          const feature = features && features[0];

          console.log('this is the feature: ', feature);

          if (feature) {
            const layerInfo = layers.find(layer => layer.id === feature.layer?.id);
            const popupContent = `
              <div style="padding: 5px">
                <h3 style="margin: 0 0 5px 0; font-size: 18px;">${feature.properties?.name_en} (${layerInfo?.id})</h3>
                <p style="font-size: 13px;">24h Change: <span style="color: ${layerInfo?.hoverColor}">${layerInfo?.change}</span></p>
              </div>
            `;
            if (popupRef.current) {
              popupRef.current.remove();
            }
            popupRef.current = new mapboxgl.Popup({ closeButton: false })
              .setLngLat(e.lngLat)
              .setHTML(popupContent)
              .addTo(map.current);
          }
        });
      });
    });
  }, [selectedCurrency, layers]);

  return <Box ref={mapContainer} w={'100%'} h={'100%'} borderLeftRadius={{ base: 'md', md: 'none' }} borderRightRadius={ 'md' }/>;
};

export default Map;
