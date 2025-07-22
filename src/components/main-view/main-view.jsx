import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import ProfileView from "../profile-view/profile-view";
import { SignupView } from "../signup-view/signup-view";
import { LoginView } from "../login-view/login-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser || null); //storedUser is used to keep users logged in on page reload
    const [token, setToken] = useState(storedToken || null);
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        if (!token) {
            return;
        }
        fetch("https://mytomhanksapp-3bff0bf9ef19.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((doc) => ({
                    _id: doc._id,
                    title: doc.title,
                    imagePath: doc.imagePath,
                    genre: doc.genre?.name || "Unknown genre",
                    director: doc.director?.name || "Unknown director",
                }));

                setMovies(moviesFromApi);
                setFilteredMovies(moviesFromApi);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
            });
    }, [token]);

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredMovies(movies);
        } else {
            const filtered = movies.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredMovies(filtered);
        }
    }, [searchTerm, movies]);

    return (
        <BrowserRouter>
            <NavigationBar user={user} onLoggedOut={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
            }}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                                localStorage.setItem("user", JSON.stringify(user));
                                                localStorage.setItem("token", token);
                                            }}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>

                        }
                    />
                    <Route
  path="/users/:username"
  element={
    !user ? (
      <Navigate to="/login" replace />
    ) : (
      <Col md={8}>
        <ProfileView
          token={token}
          movies={movies}
          MovieCard={MovieCard}
          onLogout={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        />
      </Col>
    )
  }
/>

                    <Route
                        path="/:id"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : filteredMovies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={4}>
                                        <MovieView
                                            movies={filteredMovies}
                                            setSearchTerm={setSearchTerm}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : filteredMovies.length === 0 ? (
                                    <Col md={6}>
                                        <div>The list is empty!</div>
                                    </Col>
                                ) : (
                                    <>
                                        {filteredMovies.map((movie) => (
                                            <Col className="mb-4" key={movie._id} xs={12} sm={6} md={4} lg={3}>
                                                <MovieCard
                                                    movie={movie}
                                                />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>

                {user && (
                    <Col xs={12} className="text-center my-3">
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                setUser(null);
                                setToken(null);
                                localStorage.clear();
                            }}
                        >
                            Logout
                        </button>
                    </Col>
                )}
            </Row>
        </BrowserRouter>
    );
};
