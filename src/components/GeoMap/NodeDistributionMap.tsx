"use client";

import React, { useState, useEffect } from "react";
import { scaleQuantize, scaleLinear } from "@visx/scale";
import { Mercator, Graticule } from "@visx/geo";
import * as topojson from "topojson-client";
import topology from "./world-topo.json";
import axios from "axios";
import { bitnodes } from "./bitnodesSnapshot";

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

const world = topojson?.feature(
  // @ts-ignore: module error in not recognizing type for topology
  topology,
  topology.objects.units
) as unknown as {
  type: "FeatureCollection";
  features: FeatureShape[];
};

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

interface TooltipShape {
  hostName: string;
  hostURL: string;
  town: string;
  region: string;
  nodeNumber?: string;
}

const NUMBER_OF_NODES = 100;

export default function ({
  width,
  height,
  className,
  rotate,
  events = false,
}: GeoMercatorProps) {
  const [tooltip, setTooltip] = useState<TooltipShape | null>(null);
  const [maximized, setMaximized] = useState<boolean>(false);
  const [coords, setCoords] = useState<any>();

  const centerX = (width * (maximized ? 2 : 1)) / 2;
  const centerY = (height * (maximized ? 2 : 1)) / 2;
  const scale = ((width * (maximized ? 2 : 1)) / 630) * 100;

  useEffect(() => {
    async function fetchAndPopulateNodes() {
      try {
        const response = await bitnodes();

        const nodes = response?.bitnodes?.snapshot?.nodes;
        const keys = Object.keys(nodes)
          .filter((ele) => !ele.includes(".onion:")) // this means the nodes are using a TOR network and lat/long are set to 0
          .slice(0, NUMBER_OF_NODES);

        const _tmp = keys.map((ele: any) => {
          return [
            nodes[ele][8], // long
            nodes[ele][9], // lat
            nodes[ele][12], // Host name
            nodes[ele][5], // Host URL
            nodes[ele][6], // Town name
            nodes[ele][10], // Region
            nodes[ele][4], // Node number/height
          ];
        });

        setCoords(() => _tmp);
      } catch (error) {
        console.error("BitNodes API call error:", error);
      }
    }

    fetchAndPopulateNodes();
  }, []);

  return width * (maximized ? 2 : 1) < 10 ? null : (
    <div className="relative" data-testid="nodeDistributionMain">
      <Tooltip isVisible={tooltip === null} data={tooltip} />
      <svg
        width={width * (maximized ? 2 : 1)}
        height={height * (maximized ? 2 : 1)}
        className={`${className}`}
        data-testid="nodeDistributionMap"
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
          {coords?.map((point: any, index: number) => {
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
                r={maximized ? 3.5 : 1}
                x={x}
                y={y}
                fill={fillColor}
                stroke="#333"
                strokeWidth={0}
                opacity={1.7}
                transform={`translate(${[x, y]})`}
                className="cursor-pointer hover:fill-green-300"
                onMouseEnter={() =>
                  setTooltip(() => {
                    return {
                      hostName: point[2],
                      hostURL: point[3],
                      town: point[4],
                      region: point[5],
                      nodeNumber: point[6],
                    };
                  })
                }
                onMouseLeave={() => setTooltip(null)}
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

interface TooltipProps {
  className?: string;
  isVisible: boolean;
  data: TooltipShape | null;
}

function Tooltip({ className, isVisible, data }: TooltipProps) {
  return (
    <div
      className={`absolute bottom-5 left-5 p-1 bg-slate-800 text-white rounded text-xs transition ease-in-out delay-300 ${
        isVisible ? "hidden" : "block"
      } ${className}`}
    >
      <span className="font-bold">Host name</span>:{" "}
      <span className="text-gray-400">{data?.hostName}</span>,{" "}
      <span className="font-bold">Host domain</span>:{" "}
      <span className="text-gray-400">{data?.hostURL}</span> <br />
      <span className="font-bold">Town</span>:{" "}
      <span className="text-gray-400">{data?.town}</span>,{" "}
      <span className="font-bold">Region</span>:
      <span className="text-gray-400"> {data?.region}</span> <br />
      <span className="font-bold">Node number</span>:{" "}
      <span className="text-gray-400">{data?.nodeNumber}</span>
    </div>
  );
}

interface OverlayProps {
  className?: string;
  text: string;
  isMaximized: boolean;
  maximize: React.Dispatch<React.SetStateAction<boolean>>;
}

function Overlay({ className, text, isMaximized, maximize }: OverlayProps) {
  return (
    <div
      className={`absolute top-5 right-5 p-1 bg-slate-800 text-white rounded font-sm font-bold hover:bg-slate-600 cursor-pointer ${className}`}
      onClick={() => maximize(() => !isMaximized)}
    >
      {text}
    </div>
  );
}
