import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navigation-bar.scss';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const NavigationBar = ({ user, onLoggedOut, searchTerm, setSearchTerm }) => {
    const [inputValue, setInputValue] = useState(searchTerm || "");

    useEffect(() => {
        setInputValue(searchTerm);
    }, [searchTerm]);

    const handleSubmit = (e) => {
        e.preventDefault();       // prevent page reload
        setSearchTerm(inputValue); // update the searchTerm on Enter
    };

    return (
        <Navbar expand="lg">
            <Container fluid>
                <Navbar.Brand className="d-flex align-items-center" href="/" id="logo-myTomHanksApp">myTOMHANKSAPP</Navbar.Brand>
                <Navbar.Toggle className="custom-toggler-icon" aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="ms-auto">
                        {user ? (
                            <>
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <NavDropdown title="Filter by" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Genre</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Director
                                </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link as={Link} to={`/users/${user.Username}`}>Profile</Nav.Link>
                                <Nav.Link
                                    onClick={() => {
                                        onLoggedOut(); // calls the logout function passed from MainView
                                    }}
                                >
                                    Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                            </>
                        )}
                    </Nav>
                    {user && (
                        <Form className="d-flex" onSubmit={handleSubmit}>
                            <Form.Control
                                type="search"
                                placeholder="Enter a movie name"
                                className="me-2"
                                aria-label="Search"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                            />
                            <Button className="search-button" type="submit">
                                Search
                            </Button>
                        </Form>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

