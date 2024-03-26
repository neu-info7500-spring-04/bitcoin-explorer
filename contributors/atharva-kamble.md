Name: Atharva Kamble <br>
GitHub username: atharvaneu

---

### Summary:

I wrote the NodeDistributionMap.tsx component. This component displays a svg graph by using the @visx svg library developed and maintained by AirBnB. This map shows the latest 100 nodes that are generated in the Bitcoin blockchain and provides details about individual nodes such as country name, town name, host name, host url. I am using the bitnodes.io API.

### Engineering:

1. I had to learn more about Mercator maps and how latitudes and longitudes are converted for a Mercator map projection. Mercator maps are a type of projections which map the globe on a 2 dimensional surface - they are widely used since our device screens are 2 dimensional as well. A characteristic of a Mercator map projection is that a map is divided into two hemispheres, and the field of view for regions/countries closer to the equator is quite less, but keeps on increasing as we go away from the equator. A good example to prove this is - in a Mercator project Greenland appears to be of the same size as of the continent of Africa.

2. I fetched data from `bitnodes.io` api that provides latest snapshots about the nodes in the BTC blockchain network. The API is used to get information like node height (number), host name, host URL, region, country, and town. Since I can't use this data directly I first had to clean the data - meaning remove any unnecessary information or fix formatting errors. Then, I sliced the data to 100 nodes across the world - since the API provides data for thousands of nodes - but it would have been impractical to implement and render all those nodes. So I capped the nodes to 100.

3. For displaying the map, I am using `@visx` svg manipulation library which is developed and maintained by AirBnB. It's a pretty low level SVG manipulation engine that has several inner modules such as `@visx/geo` (provides the world map out of the box), `@visx/shape`, `@visx/scale`. There's also a `world-topo.json` file that is required by the @visx library to map out the world - this file basically contains all the topological data of the world.

4. We are using grafbase so instead of making a direct axios request to the API, we use grafbase to have a centralized graphql endpoint.
