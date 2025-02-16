# Project Documentation

## Overview

This project consists of two parts: a **Backend (BE)** built with **Ruby on Rails** and a **Frontend (FE)** built with **React**. Below are the steps to set up and run both components.

---

## Backend Setup

### Requirements

- [Ruby on Rails](https://rubyonrails.org/) installed
- API key from [Geoapify](https://www.geoapify.com/)

### Installation & Running the Server

1. Navigate to the project's root directory:
   ```sh
   cd backend
   ```
2. Start the Rails server:
   ```sh
   rails server
   ```
   Once the server returns an **OK** response, the backend is running.

### Setting Up API Key

To properly use the backend, you need to set up an API key from **Geoapify**.

#### Steps to Obtain an API Key:

1. Go to [Geoapify's website](https://www.geoapify.com/).
2. Sign in using an existing account or create a new one.
3. After logging in, navigate to the **API Keys** section.
4. Generate a new API key.
5. Copy the API key.

#### Configuring the API Key

1. In the backend root directory, create a `.env` file:
   ```sh
   touch .env
   ```
2. Open the `.env` file and add the following line, changing the "your_api_key_here" with your api key:
   ```sh
   API_KEY=your_api_key_here
   ```
3. Save the file. Now, the backend is fully set up and ready to handle requests.

---

## Frontend Setup

### Requirements

- [Node.js](https://nodejs.org/) installed
- [React](https://react.dev/) framework

### Running the Frontend

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Start the client-side application:
   ```sh
   npm run dev
   ```
3. The frontend will be available at:
   ```
   http://localhost:5173
   ```

---

## Using the Application

1. Enter a **location** in the input field.
2. Select a **start date** and an **end date**.
3. Click on **Search**.

### Expected Results
- A table displaying **sunrise, sunset, and golden hour** times will be shown.
- If you select **only one day**, a graph with solar time information will be displayed.
- If you select **multiple days**, the graph will show **sunrise, sunset, and golden hour** times.

Enjoy using the platform!

