"use client";

const NodeListColumnHeader: React.FC = () => {
  return (
    <div
      className="border border-red-500 my-1"
      style={{
        display: "grid",
        gridTemplateColumns: "4fr 5fr 1fr 2fr 2fr",
        gap: "5px",
      }}
    >
      <p className=" text-red-500 text-center cursor-default font-bold">
        Address Details
      </p>
      <p className=" text-red-500 text-center cursor-default font-bold">
        User Agent Details
      </p>
      <p className=" text-red-500 text-center cursor-default font-bold">
        Height
      </p>
      <p className=" text-red-500 text-center cursor-default font-bold">
        Location Details
      </p>
      <p className=" text-red-500 text-center cursor-default font-bold">
        Network Details
      </p>
    </div>
  );
};

export default NodeListColumnHeader;
