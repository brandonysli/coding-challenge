# Coding Challenge

## Build With

-   React
-   TypeScript
-   Vite
-   TailwindCSS

## Assumptions

-   Each order consists of at most one drink ordered by every person (number of drinks incremented by one each time)
-   Coffee prices don't go over $1000

## Input / Instructions

-   Add a coworker for each coworker in the team by using the Add Coworker button
-   Make an order and specify how much each person's coffee costs by clicking the Add Order button
-   Look at Next Payer and Amount to determine the person to pay for this order and the cost
-   Click Pay for Order when the order is paid

## Logic

-   We can normalize everyone's spending by averaging the amount each person pays for each drink and then subtracting the amount each person has already spent by that amount
-   This means the person who has the most negative value has spend the least amount relative to how expensive their drinks were, so they should pay next
