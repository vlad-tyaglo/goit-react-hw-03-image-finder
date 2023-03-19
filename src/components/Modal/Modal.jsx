import React, {Component} from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css';
import PropTypes from "prop-types";

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {

    static propTypes = {
        onCloseModal: PropTypes.func.isRequired,
        children: PropTypes.node.isRequired,
    };

    componentDidMount() {
        window.addEventListener('keydown', this.onEscPress);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onEscPress);
    }

    onEscPress = (e) => {
        if (e.code === 'Escape') {
            this.props.onCloseModal();
        }
    }

    onCloseModal = (e) => {
        if (e.currentTarget === e.target) {
            this.props.onCloseModal();
        }
    }

    render() {
        return createPortal(
            <div className={css.overlay} onClick={this.onCloseModal}>
                <div className={css.modal}>
                    {this.props.children}
                </div>
            </div>, modalRoot)
    }
};

export default Modal;