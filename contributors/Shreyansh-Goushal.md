Contributor: Shreyansh Goushal
Username: @Shreycodes1

Contributions to the Unconfirmed Transactions Component
Data Fetching: Implemented a function to fetch unconfirmed transactions data from the Blockchain API using Axios. The function retrieves the latest unconfirmed transactions and updates the state of the component.

UI Design: Designed the layout of the Unconfirmed Transactions component, including a header to display the title, a list to show transaction details, and a pause/play button to control the data fetching process.

Transaction Listing: Created a list to display the hash and value of each unconfirmed transaction. Used a map function to render each transaction item dynamically based on the fetched data.

Pause/Play Functionality: Added a button to pause and resume the data fetching process. Implemented state management to toggle between the paused and active states, allowing users to control the flow of incoming transaction data.

Error Handling: Implemented error handling to catch and log any issues that occur during the data fetching process. Ensured that the component can gracefully handle errors and continue to function.

Styling: Developed CSS styles for the Unconfirmed Transactions component to create a visually appealing and user-friendly interface. Styled the header, transaction list, and pause/play button to match the overall design of the application.

Optimization: Optimized the component to fetch only the latest five unconfirmed transactions at a time, reducing the load on the API and improving the performance of the component.
