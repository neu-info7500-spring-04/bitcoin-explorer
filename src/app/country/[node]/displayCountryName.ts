"use client";

const displayCountryName = (countryCode: string): string | undefined => {
  const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
    type: "region",
  });

  let countryName: string | undefined = "N/A";

  // console.log(typeof countryCode);
  if (countryCode !== "N/A") {
    countryName = regionNamesInEnglish.of(countryCode);
  }

  return countryName;
};

export default displayCountryName;
