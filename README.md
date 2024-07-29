# Top Products HTTP Microservice

This microservice allows you to retrieve the top products from different e-commerce companies within specified categories and price ranges.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)


## Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)

## Installation

1. Clone the repository:
    ```sh
    git clone 
   
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Configuration

1. Create a `.env` file in the project root with the following content:
    ```ini
    TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    COMPANY_NAME=AmityUniversity
    CLIENT_ID=bb06fa9d-afd7-4a14-918b-a8060be88dae
    CLIENT_SECRET=RAWBnKfRoctwvuEm
    OWNER_NAME=Anubhav Yadav
    OWNER_EMAIL=anubhav.yadav1@s.amity.edu
    ROLL_NO=A2305221269
    ```

2. (Optional) Adjust other configurations as necessary.

## Running the Server

1. Start the server in development mode:
    ```sh
    npm run dev
    ```

2. Alternatively, start the server in production mode:
    ```sh
    npm start
    ```

The server will be running at `http://localhost:9876`.

## API Endpoints

### Get Top Products

Retrieve the top `n` products for a specific company and category within a price range.

- **Request**
    ```http
    GET /categories/:categoryname/products?company=:company&top=:n&minPrice=:p&maxPrice=:q
    ```
    - **Parameters:**
        - `categoryname`: The category of the product (e.g., `Laptop`).
        - `company`: The e-commerce company
