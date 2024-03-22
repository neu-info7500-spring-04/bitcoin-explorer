"use client";

const displayCountryName = (countryCode: string): string | undefined => {
  const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
    type: "region",
  });

  let countryName: string | undefined = "N/A";

  if (countryCode !== "null") {
    countryName = regionNamesInEnglish.of(countryCode);
  }

  return countryName;
};

export default displayCountryName;
