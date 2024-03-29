# Coding Challenge

## Built With

-   React
-   TypeScript
-   Vite
-   TailwindCSS

## How to run locally

-   Run: `git clone https://github.com/brandonysli/coding-challenge.git`
-   Then move into the directory: `cd coding-challenge`
-   Install dependencies: `yarn install`
-   Start server: `yarn dev`

## Input / Instructions

-   Add a coworker for each coworker in the team by using the Add Coworker button
-   Make an order and specify how much each person's coffee costs by clicking the Add Order button
-   Look at Next Payer and Amount to determine the person to pay for this order and the cost
-   Click Pay for Order when the order is paid

## Assumptions

-   Zero cost orders are allowed, which means someone decided not to buy anything
-   Each person can only buy up to one drink during an order
-   Coffee prices aren't abnormally different - don't need to introduce any complicated weighting system accounting for outlier orders
-   Coffee prices don't go over $1000

## Logic

-   We can compare everyone's spending by taking the difference between how much they spend for the group and how much their own drinks cost
-   This means the person who has the most negative value has spent the least amount relative to how expensive their drinks were, so they should pay next

## Note

-   Used React Contexts and local storage instead of creating backend to prevent the need to setup a database locally or host a database on cloud
