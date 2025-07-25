import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, token, userName, onAddFavorite }) => {
  const [adding, setAdding] = React.useState(false);
  const [added, setAdded] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    // You could optionally check here if the movie is already in favorites
    // if you pass that data to this component
  }, []);

  const handleAddFavorite = async () => {
    if (!token || !userName) {
      setError("You must be logged in to add favorites");
      return;
    }

    setAdding(true);
    setError(null);

    try {
      const response = await fetch(
        `https://mytomhanksapp-3bff0bf9ef19.herokuapp.com/users/${userName}/favorites/${movie._id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to add favorite");
      }

      const updatedUser = await response.json();
      setAdded(true);
      if (onAddFavorite) onAddFavorite(updatedUser);
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.imagePath} />
      <Card.Body className="movie-card-body">
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <Link to={`/${encodeURIComponent(movie._id)}`}>
            <Button className="movie-card-link" variant="link">
              Open
            </Button>
          </Link>

          <Button
            onClick={handleAddFavorite}
            disabled={adding || added}
            variant={added ? "success" : "primary"}
          >
            {added ? "Added to Favorites" : adding ? "Adding..." : "Add to Favorites"}
          </Button>
        </div>
        {error && <div style={{ color: "red", marginTop: "5px" }}>{error}</div>}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
  }).isRequired,
  token: PropTypes.string,
  userName: PropTypes.string,
  onAddFavorite: PropTypes.func,
};
