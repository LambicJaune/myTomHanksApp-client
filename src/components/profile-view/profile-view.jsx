import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, Row, Container } from "react-bootstrap";

const ProfileView = ({ token, onLogout, movies, MovieCard, user, onUserUpdate }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    Email: "",
    Birthday: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Populate form whenever user changes
  useEffect(() => {
    if (!user) return;
    setFormData({
      Username: user.Username,
      Password: "",
      Email: user.Email,
      Birthday: user.Birthday ? user.Birthday.substring(0, 10) : "",
    });
    setLoading(false);
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!user) return;

    try {
      const payload = {
        Username: formData.Username,
        Email: formData.Email,
        Birthday: formData.Birthday,
      };
      if (formData.Password.trim()) payload.Password = formData.Password;

      const response = await fetch(
        `https://mytomhanksapp-3bff0bf9ef19.herokuapp.com/users/${user.Username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to update user");
      }

      const data = await response.json();
      const updatedUser = data.user;
      const newToken = data.token;

      // Update state and localStorage
      onUserUpdate(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem("token", newToken);

      setFormData((prev) => ({ ...prev, Password: "" }));
      setMessage("Profile updated successfully!");

      // Update URL if username changed
      if (updatedUser.Username !== user.Username) {
        navigate(`/users/${updatedUser.Username}`, { replace: true });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      const response = await fetch(
        `https://mytomhanksapp-3bff0bf9ef19.herokuapp.com/users/${user.Username}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to delete user");
      }

      alert("Account deleted successfully.");
      onLogout();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveFavorite = async (movieId) => {
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(
        `https://mytomhanksapp-3bff0bf9ef19.herokuapp.com/users/${user.Username}/favorites/${movieId}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) throw new Error("Failed to remove movie from favorites");

      const updatedUser = await response.json();
      onUserUpdate(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setMessage("Movie removed from favorites.");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  const favoriteMovies = movies.filter((m) => user.FavoriteMovies?.includes(m._id));

  return (
    <Container style={{ maxWidth: "960px" }}>
      <h2>Your Profile</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}

      <Form onSubmit={handleUpdate}>
        <Form.Label>
          Username:
          <Form.Control
            name="Username"
            value={formData.Username}
            onChange={handleChange}
            required
          />
        </Form.Label>
        <br />
        <Form.Label>
          Password (leave blank to keep current):
          <Form.Control
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            placeholder="New password"
          />
        </Form.Label>
        <br />
        <Form.Label>
          Email:
          <Form.Control
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </Form.Label>
        <br />
        <Form.Label>
          Date of Birth:
          <Form.Control
            type="date"
            name="Birthday"
            value={formData.Birthday}
            onChange={handleChange}
          />
        </Form.Label>
        <br />
        <Button type="submit" variant="primary">
          Update Profile
        </Button>
      </Form>

      <hr />
      <h3>Your Favorite Movies</h3>
      <br />
      {favoriteMovies.length === 0 ? (
        <p>No favorite movies yet.</p>
      ) : (
        <Row className="g-4">
          {favoriteMovies.map((movie) => (
            <Col xs={12} sm={6} md={4} key={movie._id}>
              <div
                style={{
                  position: "relative",
                  minHeight: "400px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <MovieCard movie={movie} />
                <Button
                  onClick={() => handleRemoveFavorite(movie._id)}
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    padding: "2px 6px",
                  }}
                  aria-label={`Remove ${movie.title} from favorites`}
                >
                  Remove from list
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      )}

      <br />
      <hr />
      <br />
      <Button variant="danger" onClick={handleDelete}>
        Deregister (Delete Account)
      </Button>
    </Container>
  );
};

export default ProfileView;
