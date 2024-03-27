## Name: Venkata Sai Pavan Mallik Gutta Username: pavan55523

## Contributions:

1. Created (Bitcoin Header Info) component that is responsible for fetching Bitcoin data using GraphQL and Axios.
2. It fetches the total number of Bitcoin transactions in the last 24 hours, the latest block information, and the current Bitcoin price in USD.
3. Additionally, it fetches historical Bitcoin price data for the last 10 days. Once the data is fetched, it passes this data as props to the BitcoinDashboard component.
4. Created (a Bitcoin Dashboard) component that receives props such as Bitcoin price, total transactions, latest block information, and historical price data.
5. It uses Chart.js to display a line chart showing the historical Bitcoin price over the last 10 days.
6. The component also displays the current Bitcoin price, current difficulty, total transactions, and the height of the latest block.

Overall, I've created a dynamic Bitcoin dashboard that displays the latest Bitcoin data, providing users with real-time information about the Bitcoin network.
