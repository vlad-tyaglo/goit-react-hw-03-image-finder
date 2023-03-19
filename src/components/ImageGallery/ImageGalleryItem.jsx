import React, { Component } from "react";
import css from './ImageGallery.module.css';
import PropTypes from "prop-types";
import Modal from "components/Modal/Modal";

class ImageGalleryItem extends Component {

        static propTypes = {
                picture: PropTypes.shape({
                        webformatURL: PropTypes.string, 
                        largeImageURL: PropTypes.string, 
                        tags: PropTypes.string,
                }).isRequired,
        };

        state = {
                isModalOpen: false,
        }

        onOpenModal = () => {
                this.setState({
                        isModalOpen: true,
                })
        }

        onCloseModal = () => {
                this.setState({
                        isModalOpen: false,
                })
        }

        render() {
                const { webformatURL, largeImageURL, tags } = this.props.picture;
                return (
                        <div>
                                <img src={webformatURL} alt={tags} className={css.image} onClick={this.onOpenModal}/>
                                {this.state.isModalOpen && <Modal onCloseModal={this.onCloseModal}><img src={largeImageURL} alt={tags} /></Modal>}
                        </div>
                        
                )
        }
}

export default ImageGalleryItem;