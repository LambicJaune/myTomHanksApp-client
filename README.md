# myTomHanksApp-client
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/LambicJaune/myTomHanksApp-client)

This repository contains the client-side application for **myTomHanksApp**, a web app dedicated to the filmography of Tom Hanks. It is a single-page application built with React that communicates with a separate backend movie API.

## Features

-   **User Authentication**: Secure sign-up and login functionality.
-   **Browse Movies**: View a complete list of Tom Hanks movies fetched from the API.
-   **Search & Filter**:
    -   Search for movies by title.
    -   Filter the movie list by genre or director (mutually exclusive).
-   **Movie Details**: Click on any movie to see a detailed view with its genre, director, and poster.
-   **User Profiles**:
    -   View and update your personal user information (username, email, birthday).
    -   Manage a list of your favorite movies (add/remove).
    -   Deregister your account.
-   **Responsive Design**: The user interface is built with React-Bootstrap and is optimized for both desktop and mobile devices.
-   **State management** : Using Redux Toolkit
-   **Token-based authentication and protected routes**
-   **View movie and director details (TBA)**

## Tech Stack

-   **Framework**: React 19
-   **Routing**: React Router
-   **State Management**: Redux Toolkit
-   **UI Library**: React-Bootstrap & Bootstrap 5
-   **Styling**: SASS (via Parcel transformer)
-   **Bundler**: Parcel

## Getting Started

To run this project locally, you will need Node.js and npm installed.

### Prerequisites

This client application requires the corresponding backend API to be running. You can find the backend repository here: [movie_api](https://github.com/LambicJaune/movie_api.git). Please follow the setup instructions in that repository first. The client is configured to connect to the deployed Heroku API at `https://mytomhanksapp-3bff0bf9ef19.herokuapp.com/`.

### Installation & Launch

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/LambicJaune/myTomHanksApp-client.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd myTomHanksApp-client
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

4.  **Start the development server:**
    ```sh
    npm start
    ```
    The application will automatically open in your browser, typically at `http://localhost:1234`.

## Project Structure

The application's source code is located in the `src/` directory and is organized into components and Redux state management files.

### Key Components

-   `MainView`: The central component that manages routing and renders different views based on the URL and user authentication status.
-   `NavigationBar`: Provides navigation links, user authentication buttons, search functionality, and dropdown filters for genre and director.
-   `MovieCard`: A reusable card component to display a summary of a movie in the main list.
-   `MovieView`: A detailed view of a single movie, shown when a user clicks on a `MovieCard`.
-   `LoginView` & `SignupView`: Forms for user authentication and registration.
-   `ProfileView`: A dedicated view for users to manage their profile information and favorite movies.

### State Management (Redux)

The application uses Redux Toolkit for efficient state management.

-   **`store.js`**: Configures the main Redux store.
-   **`moviesSlice.js`**: Defines the state and reducers for managing the movie list and filters. It includes actions for:
    -   `setMovies`: To store the list of movies fetched from the API.
    -   `setGenreFilter` / `setDirectorFilter`: To apply a filter to the movie list.
    -   `clearFilter`: To remove any active filters.

## Deployment

This project is configured for deployment on Netlify. The `netlify.toml` file includes a redirect rule to ensure that React Router handles all client-side routing correctly in a single-page application environment.


[[redirects]]
  from = "/*"
  to = "/"
  status = 200


This runs the app on:
http://localhost:1234 (default Parcel port)

Author & License
Author: LambicJaune (Gael Giraud)

License: ISC

GitHub Repo: https://github.com/LambicJaune/myTomHanksApp-client/