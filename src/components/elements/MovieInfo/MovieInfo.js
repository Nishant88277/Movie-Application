import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import {API_KEY, API_URL, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE} from "../../../config";
import MovieThumb from "../MovieThumb/MovieThumb";
import './MovieInfo.css';
import ReactPlayer from 'react-player';
import Modal from 'react-modal';

class MovieInfo extends Component {
    buttonStyle = {
        background: "none",
        border: "none",
        fontSize: "30px",
        fontWeight: "900",
        outline: "none",
        position: "absolute",
        top: "20px",
        right: "50%",
        marginRight: "-320px",
        cursor: "pointer"
    };

    constructor(props) {
        super(props);

        this.state = {
            key: '',
            modalIsOpen: false,
            gender: ''
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    componentDidMount() {
        fetch(`${API_URL}movie/${this.props.movie.id}/videos?api_key=${API_KEY}`)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    key: result.results[0].key
                })
            });
    }

    render() {
        let url = `https://www.youtube.com/embed/${this.state.key}`;
        return (
            //     style={{
            //     background: this.props.movie.backdrop_path ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.props.movie.backdrop_path}')` : '#000'
            // }}
            <div className="rmdb-movieinfo">
                <ReactPlayer class="background-video" style={{
                    background: this.props.movie.backdrop_path ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.props.movie.backdrop_path}')` : '#000'
                }}/>
                <div className="rmdb-movieinfo-content">
                    <div className="rmdb-movieinfo-thumb">
                        <MovieThumb
                            image={this.props.movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${this.props.movie.poster_path}` : '/images/no_image.jpg'}/>
                    </div>
                    <div className="rmdb-movieinfo-text">
                        <h1>{this.props.movie.title}</h1>

                        <h3>PLOT</h3>
                        <p>{this.props.movie.overview}</p>
                        <h3>IMDB RAITING</h3>
                        <div className="rmdb-rating">
                            <meter min="0" max="100" optimum="100" low="40" high="70"
                                   value={this.props.movie.vote_average * 10}/>
                            <p className="rmdb-score">{this.props.movie.vote_average}</p>
                        </div>
                        {this.props.directors.length > 1 ? <h3>DIRECTORS</h3> : <h5>DIRECTOR</h5>}
                        {this.props.directors.map((element, i) => {
                            return <p key={i} className="rmdb-director">{element.name}</p>
                        })}
                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        contentLabel="Example Modal"
                        ariaHideApp={false}
                        className="player"
                    >
                        <ReactPlayer className="VideoPlayer" url={url} controls={true}/>
                        <button style={this.buttonStyle} onClick={this.closeModal}>X</button>
                    </Modal>

                    {/*https://www.youtube.com/embed/P6AaSMfXHbA*/}
                    <FontAwesome onClick={this.openModal} className="fa-play" name="film" size="5x"/>

                </div>
            </div>
        );
    }
}

export default MovieInfo;
