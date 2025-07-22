import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { id } = useParams();

    const movie = movies.find((m) => m._id === id);

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
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
};
