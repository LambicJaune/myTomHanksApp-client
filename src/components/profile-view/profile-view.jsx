import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProfileView = ({ token, onLogout, movies, MovieCard, onUserUpdate }) => {
  const { userName } = useParams(); // Extract userName from the route
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    Email: "",
    Birthday: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!token || !userName) return;

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://mytomhanksapp-3bff0bf9ef19.herokuapp.com/users/${userName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const data = await response.json();
        setUserData(data);
        setFormData({
          Username: data.Username,
          Password: "",
          Email: data.Email,
          Birthday: data.Birthday ? data.Birthday.substring(0, 10) : "",
        });
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchUser();
  }, [token, userName]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(
        `https://mytomhanksapp-3bff0bf9ef19.herokuapp.com/users/${userName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to update user");
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      setFormData((prev) => ({ ...prev, Password: "" }));
      setMessage("Profile updated successfully!");
      if (onUserUpdate) onUserUpdate(updatedUser);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      const response = await fetch(
        `https://mytomhanksapp-3bff0bf9ef19.herokuapp.com/users/${userName}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!userData) return null;

  const favoriteMovies = movies.filter((m) =>
    userData.FavoriteMovies?.includes(m._id)
  );

  return (
    <div>
      <h2>Your Profile</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}

      <form onSubmit={handleUpdate}>
        <label>
          Username:
          <input
            name="Username"
            value={formData.Username}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Password (leave blank to keep current):
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            placeholder="New password"
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Date of Birth:
          <input
            type="date"
            name="Birthday"
            value={formData.Birthday}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit">Update Profile</button>
      </form>

      <hr />

      <h3>Your Favorite Movies</h3>
      {favoriteMovies.length === 0 ? (
        <p>You have no favorite movies yet.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {favoriteMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}

      <hr />

      <button style={{ color: "red" }} onClick={handleDelete}>
        Deregister (Delete Account)
      </button>
    </div>
  );
};

export default ProfileView;
