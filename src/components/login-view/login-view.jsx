import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

/**
 * LoginView component
 *
 * Renders a login form that allows the user to enter their username and password.
 * On submission, it sends the credentials to the backend API. If valid, it saves
 * the returned session data in localStorage and calls `onLoggedIn`.
 *
 * @component
 * @param {Object} props - React props
 * @param {(user: Object, token: string) => void} props.onLoggedIn - Callback fired after successful login.
 * @returns {JSX.Element} A login form with username and password fields.
 */
export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

     /**
   * Handles form submission for login.
   *
   * Prevents the default form behavior (full page reload), sends a POST request
   * to the backend API with the username and password, and processes the response.
   *
   * - On success: stores user, token, and username in localStorage and calls `onLoggedIn`.
   * - On failure: shows an error alert.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - Form submit event
   */
    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        const data = {
            username: username,
            password: password,
        };

        fetch("https://mytomhanksapp-3bff0bf9ef19.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("username", data.user.Username);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
                Submit
            </Button>
        </Form>
    );
};