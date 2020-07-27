import React, {Component} from 'react';
import HeroImage from "../elements/HeroImage/HeroImage";
import SearchBar from "../elements/SearchBar/SearchBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import {API_KEY, API_URL, BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE} from "../../config";
import MovieThumb from "../elements/MovieThumb/MovieThumb";
import Spinner from "../elements/Spinner/Spinner";
import './Home.css';
import Datetime from "react-datetime";
import 'react-datetime/css/react-datetime.css';

const relativePos = {
    position: "relative"
};

class Home extends Component {

    state = {
        movies: [],
        heroImage: null,
        loading: false,
        currentPage: 0,
        totalPages: 0,
        searchTerm: '',
        hidden: "hidden",
        search: "hidden",
        datetime: ''
    };

    componentDidMount() {
        document.addEventListener('scroll', this.handleScroll, true);
        this.setState({loading: true});
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchItems(endpoint);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll, true);
    }

    handleScroll = () => {
        const {searchTerm, currentPage, length_t} = this.state;
        let scrolled = (document.body.scrollTop || document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
        if ((scrolled > 0.961189698948132) && (length_t !== 0)) {
            let endpoint = '';
            this.setState({loading: true});
            if (searchTerm === '') {
                document.title = `TMDB movie app`;
                endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
            } else {
                endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage + 1}`;
            }
            this.fetchItems(endpoint, true);
            this.setState({
                hidden: "hidden",
                search: "hidden"
            })
        } else if (length_t === 0) {
            this.setState({
                hidden: "show",
                search: "hidden"
            })
        }
    };

    handleDate = (date) => {
        let gotDate = date.format('YYYY');
        this.setState({movies: [], loading: true});
        let endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&primary_release_year=${gotDate}`;
        this.fetchItems(endpoint);
    };

    searchItems = (searchTerm) => {
        let endpoint = '';
        this.setState({
            movies: [],
            loading: true,
            searchTerm
        });

        if (searchTerm === '') {
            document.title = `TMDB Movie app`;
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        } else {
            document.title = `You searched for '${this.state.searchTerm}'`;
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
        }
        this.fetchItems(endpoint);
    };

    fetchItems = (endpoint, load_more = false) => {
        const {movies, heroImage} = this.state;
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                if (load_more) {
                    this.setState({
                        movies: [...movies, ...result.results],
                        heroImage: heroImage || result.results[0],
                        loading: false,
                        currentPage: result.page,
                        totalPages: result.total_pages,
                        length_t: result.results.length,
                    });
                } else {
                    this.setState({
                        movies: [...result.results],
                        heroImage: heroImage || result.results[0],
                        loading: false,
                        currentPage: result.page,
                        totalPages: result.total_pages,
                        length_t: result.results.length,
                    })
                }

            })
    };

    render() {
        const {movies, heroImage, searchTerm, loading, hidden, search} = this.state;

        return (
            <div className="rmdb-home">
                {heroImage ?
                    <div style={relativePos}>
                        <HeroImage
                            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
                            title={heroImage.original_title}
                            text={heroImage.overview}
                        />
                        <SearchBar callback={this.searchItems}/>
                        <Datetime dateFormat="YYYY" onChange={this.handleDate}
                                  inputProps={{placeholder: 'Select year'}}/>
                    </div> : null}

                <div className="rmdb-home-grid">
                    <FourColGrid
                        header={searchTerm ? `Search result for '${searchTerm}'` : 'Popular Movies'}
                        loading={loading}
                    >
                        {movies.map((element, i) => {
                            return <MovieThumb
                                key={i}
                                image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : './images/no_image.jpg'}
                                movieId={element.id}
                                movieName={element.original_title}
                            />
                        })}
                    </FourColGrid>
                    {this.state.loading ? <Spinner/> : null}
                    <div className={"rmdb_end " + hidden}>Reached end</div>
                    <div className={"rmdb_end " + search}>Wrong search</div>
                </div>
            </div>
        );
    }
}

export default Home;
