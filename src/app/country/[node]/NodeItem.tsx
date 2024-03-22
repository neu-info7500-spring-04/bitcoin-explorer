import React from "react";
import displayCountryName from "../displayCountryName";

interface Props {
  nodeData: CountryNode;
}

const NodeItem: React.FC<Props> = ({ nodeData }) => {
  const address: string = Object.keys(nodeData)[0];

  const [
    protocolVersion,
    userAgent,
    connectedSince,
    services,
    height,
    hostName,
    city,
    countryCode,
    latitude,
    longitude,
    timeZone,
    ASN,
    organizationName,
  ]: NodeInfo = Object.values(nodeData)[0];

  return (
    <div
      className="border border-red-500"
      style={{
        display: "grid",
        gridTemplateColumns: "4fr 5fr 1fr 2fr 2fr",
        gap: "5px",
      }}
    >
      <>
        {/* Address Details */}
        <div className="flex flex-col gap-1 p-1">
          <p className="text-red-500 cursor-default px-1">
            Address: {address ? address : "N/A"}
          </p>
          <p className="text-red-500 cursor-default px-1">
            Connected Since: {connectedSince ? connectedSince : "N/A"}
          </p>
          <p className="text-red-500 cursor-default px-1">
            Host Name: {hostName ? hostName : "N/A"}
          </p>
          <p className="text-red-500 cursor-default px-1">
            Services: {services ? services : "N/A"}
          </p>
        </div>
        {/* User Agent Details */}
        <div className="flex flex-col gap-1 p-1">
          <p className="text-red-500 cursor-default px-1">
            User Agent: {userAgent ? userAgent : "N/A"}
          </p>
          <p className="text-red-500 cursor-default px-1">
            Protocol Version: {protocolVersion ? protocolVersion : "N/A"}
          </p>
        </div>
        {/* Height */}
        <div className="flex flex-col gap-1 p-1">
          <p className="text-red-500 text-center cursor-default px-1">
            {height}
          </p>
        </div>

        {/* Location Details */}
        <div className="flex flex-col gap-1 p-1">
          <p className="text-red-500 cursor-default px-1">
            Timezone: {timeZone ? timeZone : "N/A"}
          </p>
          <p className="text-red-500 cursor-default px-1">
            {/* Location: {city ? city : "N/A"}, {displayCountryName(countryCode)} */}
          </p>
          <p className="text-red-500 cursor-default px-1">
            Coordinates: {latitude ? latitude : "N/A"},{" "}
            {longitude ? longitude : "N/A"}
          </p>
        </div>
        {/* Organization Details */}
        <div className="flex flex-col gap-1 p-1">
          <p className="text-red-500 cursor-default px-1">
            Organisation Name: {organizationName ? organizationName : "N/A"}
          </p>
          <p className="text-red-500 cursor-default px-1">
            ASN: {ASN ? ASN : "N/A"}
          </p>
        </div>
      </>
    </div>
  );
};

export default NodeItem;
