import React, {Component} from 'react';
import {IMAGE_BASE_URL} from "../../../config";
import './Actor.css';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class Actor extends Component {

    constructor(props) {
        super(props);

        this.state = {
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

    render() {
        const POSTER_SIZE = "w154";
        return (
            <div className="cursor">
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >
                    <p><b>Name:</b> {this.props.actor.name}</p>
                    <p><b>Credit Id:</b> {this.props.actor.credit_id}</p>
                    <p><b>Gender:</b> {this.props.actor.gender === 2 ? "Male" : "Female"}</p>
                    <button onClick={this.closeModal}>close</button>
                </Modal>
                <div onClick={this.openModal} className="rmdb-actor">
                    <img
                        src={this.props.actor.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${this.props.actor.profile_path}` : '/images/no_image.jpg'}
                        alt="actorThumb"/>
                    <span className="rmdb-actor-name">
                        {this.props.actor.name}
                    </span>
                    <span className="rmdb-actor-character">
                        {this.props.actor.character}
                    </span>
                </div>
            </div>
        );
    }
}

export default Actor;
