import React, {Component} from 'react';
import {API_KEY, API_URL} from "../../config";
import Navigation from '../elements/Navigation/Navigation';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar'
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import Actor from "../elements/Actor/Actor";
import Spinner from "../elements/Spinner/Spinner";
import './Movie.css'

class Movie extends Component {
    state = {
        loading: false,
        movie: '',
        actors: '',
        directors: []
    };

    componentDidMount() {
        this.setState({loading: true});
        const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
        this.fetchItems(endpoint);
    }

    fetchItems = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                if (result.status_code) {
                    this.setState({loading: false})
                } else {
                    this.setState({movie: result}, () => {
                        const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}&language=en-US`;
                        fetch(endpoint)
                            .then(result => result.json())
                            .then(result => {
                                const directors = result.crew.filter((member) => member.job === "Director");
                                this.setState({
                                    actors: result.cast,
                                    loading: false,
                                    directors
                                })
                            })
                    })
                }
            })
            .catch(error => console.error('Error:', error))
    };

    render() {
        const {directors, movie, actors, loading} = this.state;
        return (
            <div className="rmdb-movie">
                {movie ?
                    <div>
                        <Navigation movie={movie.original_title}/>
                        <MovieInfo movie={movie} directors={directors}/>
                        <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue}/>
                    </div> : null}
                {this.state.actors ?
                    <div className="rmdb-movie-grid">
                        <FourColGrid header={'Actors'}>
                            {actors.map((element, i) => {
                                return <Actor key={i} actor={element}/>
                            })}
                        </FourColGrid>
                    </div> : null}
                {actors && loading ? <h1>No movie found</h1> : null}
                {loading ? <Spinner/> : null}
            </div>
        );
    }
}

export default Movie;
