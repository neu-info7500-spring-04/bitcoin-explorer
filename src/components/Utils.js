export function graphQuery(raw){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-API-KEY", process.env.BITQUERY_API_KEY);
    myHeaders.append("Authorization", "Bearer ory_at_LrTNFYR4lqAHeV9rbF-KRe3LhTOvxpskt7bFGkQqQsA.Bp9rbp8oc67kVtu5VI181wTHjFOUBDCQQt6CoHzTuAw");
    
    const requestOptions = {
       method: "POST",
       headers: myHeaders,
       body: raw,
       redirect: "follow"
    };
    
    return fetch("https://graphql.bitquery.io", requestOptions)
       .then((response) => response.text())
       .then((result) => result)
       .catch((error) => console.error(error));

}