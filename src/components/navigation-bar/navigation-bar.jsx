import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navigation-bar.scss';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setGenreFilter, setDirectorFilter, clearFilter } from "../../redux/moviesSlice";

export const NavigationBar = ({ user, onLoggedOut, searchTerm = "", setSearchTerm, movies }) => {
    const [inputValue, setInputValue] = useState(searchTerm || "");
    const dispatch = useDispatch();

    useEffect(() => {
        setInputValue(searchTerm || "");
    }, [searchTerm]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearFilter()); 
        setSearchTerm(inputValue);
    };

    // Get unique genres and directors
    const genres = [...new Set(movies.map(movie => movie.genre).filter(Boolean))];
    const directors = [...new Set(movies.map(movie => movie.director).filter(Boolean))];

    return (
        <Navbar expand="lg">
            <Container fluid>
                <Navbar.Brand className="d-flex align-items-center" href="/" id="logo-myTomHanksApp">myTOMHANKSAPP</Navbar.Brand>
                <Navbar.Toggle className="custom-toggler-icon" aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="ms-auto">
                        {user ? (
                            <>
                                <Nav.Link
                                    as={Link}
                                    to="/"
                                    onClick={() => dispatch(clearFilter())}  // <-- clear filters here
                                >
                                    Home
                                </Nav.Link>

                                <NavDropdown title="Filter by" id="navbarScrollingDropdown">
                                    <NavDropdown.Header>Genre</NavDropdown.Header>
                                    {genres.map((genre) => (
                                        <NavDropdown.Item
                                            key={genre}
                                            onClick={() => dispatch(setGenreFilter(genre))}
                                        >
                                            {genre}
                                        </NavDropdown.Item>
                                    ))}
                                    <NavDropdown.Divider />
                                    <NavDropdown.Header>Director</NavDropdown.Header>
                                    {directors.map((director) => (
                                        <NavDropdown.Item
                                            key={director}
                                            onClick={() => dispatch(setDirectorFilter(director))}
                                        >
                                            {director}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>

                                <Nav.Link as={Link} to={`/users/${user.Username}`}>Profile</Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
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
                                onChange={(e) => setInputValue(e.target.value)}
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
};
