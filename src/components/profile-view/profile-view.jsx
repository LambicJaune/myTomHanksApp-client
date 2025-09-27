import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, Row, Container } from "react-bootstrap";

const ProfileView = ({ token, onLogout, movies, MovieCard, onUserUpdate }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    Email: "",
    Birthday: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Load user data from localStorage & API
  const loadUser = async () => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (!storedToken || !storedUsername) return;

    try {
      const response = await fetch(
        `https://mytomhanksapp-3bff0bf9ef19.herokuapp.com/users/${storedUsername}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();
      setUser(data);
      setFormData({
        Username: data.Username,
        Password: "",
        Email: data.Email,
        Birthday: data.Birthday ? data.Birthday.substring(0, 10) : "",
      });
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!user) return;

    const currentUsername = localStorage.getItem("username");
    const payload = {
      Username: formData.Username,
      Email: formData.Email,
      Birthday: formData.Birthday,
    };
    if (formData.Password.trim()) payload.Password = formData.Password;

    try {
      const response = await fetch(
        `https://mytomhanksapp-3bff0bf9ef19.herokuapp.com/users/${currentUsername}`,
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

      const updatedData = await response.json();

      // Update localStorage & parent state
      localStorage.setItem("user", JSON.stringify(updatedData.user));
      localStorage.setItem("username", updatedData.user.Username);
      if (updatedData.token) localStorage.setItem("token", updatedData.token);
      onUserUpdate(updatedData.user);

      setUser(updatedData.user);
      setFormData((prev) => ({ ...prev, Password: "" }));
      setMessage("Profile updated successfully!");

      // Update URL for readability
      navigate(`/users/${updatedData.user.Username}`, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    const currentUsername = localStorage.getItem("username");
    try {
      const response = await fetch(
        `https://mytomhanksapp-3bff0bf9ef19.herokuapp.com/users/${currentUsername}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response.ok) throw new Error("Failed to delete user");

      alert("Account deleted successfully.");
      localStorage.clear();
      onLogout();
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
          <Form.Control name="Username" value={formData.Username} onChange={handleChange} required />
        </Form.Label>
        <br />
        <Form.Label>
          Password (leave blank to keep current):
          <Form.Control type="password" name="Password" value={formData.Password} onChange={handleChange} placeholder="New password" />
        </Form.Label>
        <br />
        <Form.Label>
          Email:
          <Form.Control type="email" name="Email" value={formData.Email} onChange={handleChange} required />
        </Form.Label>
        <br />
        <Form.Label>
          Date of Birth:
          <Form.Control type="date" name="Birthday" value={formData.Birthday} onChange={handleChange} />
        </Form.Label>
        <br />
        <Button type="submit" variant="primary">Update Profile</Button>
      </Form>

      <hr />
      <h3>Your Favorite Movies</h3>
      <Row className="g-4">
        {favoriteMovies.map((movie) => (
          <Col key={movie._id} xs={12} sm={6} md={4}>
            <div style={{ position: "relative", minHeight: "400px", display: "flex", flexDirection: "column" }}>
              <MovieCard movie={movie} />
            </div>
          </Col>
        ))}
      </Row>

      <br />
      <hr />
      <Button variant="danger" onClick={handleDelete}>Deregister (Delete Account)</Button>
    </Container>
  );
};

export default ProfileView;
