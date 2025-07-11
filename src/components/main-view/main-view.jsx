import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      image: "https://xl.movieposterdb.com/12_04/1994/109830/xl_109830_58524cd6.jpg?v=2025-06-14%2017:14:56",
      title: "Forrest Gump",
      description: "A slow-witted but kind-hearted man from Alabama witnesses and unwittingly influences several historical events in the 20th century United States. Through it all, he never stops loving his childood sweetheart, Jenny",
      genre : "Drama",
      director: "Robert Zemeckis",
    },
        {
      id: 2,
      image: "https://xl.movieposterdb.com/10_01/2000/162222/xl_162222_76cbbd29.jpg?v=2025-04-17%2022:10:13",
      title: "Cast Away",
      description: "After a place crash, a FedEx executive survives on a deserted island for years, facing isolation and hardship while learning to adapt and persevere",
      genre : "Adventure",
      director: "Robert Zemeckis",
    },
        {
      id: 3,
      image: "https://xl.movieposterdb.com/05_09/2004/0362227/xl_50378_0362227_ed5986f3.jpg?v=2025-05-08%2018:51:30",
      title: "The Terminal",
      description: "A man from a war-torn country becomes stranded in an airport terminal when his passport is no longer valid and he cannot enter the U.S. or return home",
      genre : "Comedy",
      director: "Steven Spielberg",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
