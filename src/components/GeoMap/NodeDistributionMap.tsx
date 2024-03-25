"use client";

import React, { useState, useEffect } from "react";
import { scaleQuantize, scaleLinear } from "@visx/scale";
import { Mercator, Graticule } from "@visx/geo";
import * as topojson from "topojson-client";
import topology from "./world-topo.json";
import axios from "axios";

export const background = "#f9f7e8";

export type GeoMercatorProps = {
  width: number;
  height: number;
  events?: boolean;
  className?: string;
  rotate?: any;
};

interface FeatureShape {
  type: "Feature";
  id: string;
  geometry: { coordinates: [number, number][][]; type: "Polygon" };
  properties: { name: string };
}

export interface CoordinateShape {
  name?: string;
  lat: number;
  long: number;
}

const world = topojson?.feature(
  // @ts-ignore: module error in not recognizing type for topology
  topology,
  topology.objects.units
) as unknown as {
  type: "FeatureCollection";
  features: FeatureShape[];
};

const points = [
  { name: "Point A", coordinates: [-59.479, -64.042] },
  { name: "Boston", coordinates: [-71.079906, 42.349126] },
  { name: "Chad", coordinates: [16.69616, 19.035] },
  { name: "Kalyan", coordinates: [73.135382, 19.221667] },
  { name: "Rio", coordinates: [-43.209, -23] },
  { name: "Tasmania", coordinates: [146.4667, -41.94] },
  // Add more points as needed...
];

const color = scaleQuantize({
  domain: [
    Math.min(...world.features.map((f) => f.geometry.coordinates.length)),
    Math.max(...world.features.map((f) => f.geometry.coordinates.length)),
  ],
  range: [
    "#ffb01d",
    "#ffa020",
    "#ff9221",
    "#ff8424",
    "#ff7425",
    "#fc5e2f",
    "#f94b3a",
    "#f63a48",
  ],
});

function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function latLonToOffsets(
  latitude: number,
  longitude: number,
  mapWidth: number,
  mapHeight: number
) {
  const FE = 180; // false easting
  const radius = mapWidth / (2 * Math.PI);

  const latRad = degreesToRadians(latitude);
  const lonRad = degreesToRadians(longitude + FE);

  const x = lonRad * radius;

  const yFromEquator = radius * Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = mapHeight / 2 - yFromEquator;

  return { x, y };
}

export default function ({
  width,
  height,
  className,
  rotate,
  events = false,
}: GeoMercatorProps) {
  const [maximized, setMaximized] = useState<boolean>(false);
  const [coords, setCoords] = useState<FeatureShape[]>();

  const centerX = (width * (maximized ? 2 : 1)) / 2;
  const centerY = (height * (maximized ? 2 : 1)) / 2;
  const scale = ((width * (maximized ? 2 : 1)) / 630) * 100;

  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: "https://bitnodes.io/api/v1/snapshots/latest/?field=coordinates",
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    axios.request(config).then((response) => {
      const _tmp = response?.data?.coordinates?.slice(0, 100);
      setCoords(() => _tmp);
    });
  }, []);

  return width * (maximized ? 2 : 1) < 10 ? null : (
    <div className="relative">
      <svg
        width={width * (maximized ? 2 : 1)}
        height={height * (maximized ? 2 : 1)}
        className={`${className}`}
      >
        <rect
          x={0}
          y={0}
          width={width * (maximized ? 2 : 1)}
          height={height * (maximized ? 2 : 1)}
          fill={background}
          rx={14}
        />
        <Mercator<FeatureShape>
          data={world.features}
          scale={scale}
          translate={[centerX, centerY + 10]}
        >
          {(mercator) => (
            <g>
              <Graticule
                graticule={(g) => mercator.path(g) || ""}
                stroke="rgba(33,33,33,0.05)"
              />
              {mercator.features.map(({ feature, path }, i) => (
                <path
                  key={`map-feature-${i}`}
                  d={path || ""}
                  fill={color(feature.geometry.coordinates.length)}
                  stroke={background}
                  strokeWidth={0.5}
                  onClick={() => {
                    if (events)
                      alert(
                        `Clicked: ${feature.properties.name} (${feature.id})`
                      );
                  }}
                />
              ))}
            </g>
          )}
        </Mercator>
        <g>
          {coords?.map((point, index) => {
            const { x, y } = latLonToOffsets(
              // @ts-ignore:  point is of type [number, number]
              point[0],
              // @ts-ignore:  point is of type [number, number]
              point[1],
              width * (maximized ? 2 : 1),
              height * (maximized ? 2 : 1)
            );

            let fillColor = "#00ad17";

            return (
              <circle
                key={"circle_key_" + x + ">>>" + y}
                r={maximized ? 3 : 1}
                x={x}
                y={y}
                fill={fillColor}
                stroke="#333"
                strokeWidth={0}
                opacity={1.7}
                transform={`translate(${[x, y]})`}
              />
            );
          })}
        </g>
      </svg>
      <Overlay
        className=""
        text={maximized ? "minimize" : "maximize"}
        isMaximized={maximized}
        maximize={setMaximized}
      />
    </div>
  );
}

export interface OverlayProps {
  className?: string;
  text: string;
  isMaximized: boolean;
  maximize: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Overlay({
  className,
  text,
  isMaximized,
  maximize,
}: OverlayProps) {
  return (
    <div
      className={`absolute top-5 right-5 p-1 bg-slate-800 text-white rounded font-sm font-bold hover:bg-slate-600 cursor-pointer ${className}`}
      onClick={() => maximize(() => !isMaximized)}
    >
      {text}
    </div>
  );
}
