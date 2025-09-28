import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { useNavigate } from 'react-router-dom';

/**
 * Displays detailed information for a single movie, including
 * its title, genre, director, and poster image. Provides a back
 * button to return to the main movie list.
 *
 * @component
 * @param {Object} props - React props
 * @param {Array<{_id: string, title: string, imagePath: string, genre: string, director: string}>} props.movies - Array of movies to search
 * @param {function(string):void} props.setSearchTerm - Function to update the current search term
 * @returns {ReactElement} A view showing details of a selected movie
 */
export const MovieView = ({ movies, setSearchTerm }) => {
    const { id } = useParams();

    const movie = movies.find((m) => m._id === id);

    const navigate = useNavigate();

    /**
   * Navigates back to the main movie list.
   *
   * @function handleBack
   * @returns {void}
   */
    const handleBack = () => {
        navigate("/"); // go back to main page (movie list)
    };

    if (!movie) {
        return <div className="text-center">Movie not found</div>;
    }

    return (
        <div className="movie-view text-center">
            <div>
                <img className="w-100" src={movie.imagePath} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director}</span>
            </div>
            <Link to={`/`}>
                <button className="back-button" onClick={handleBack}>Back</button>
            </Link>
        </div>
    );
};
