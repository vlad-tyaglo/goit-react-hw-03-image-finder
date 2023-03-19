import React, {Component} from "react";
import css from './Searchbar.module.css'
import {IoIosSearch} from 'react-icons/io'
import PropTypes from "prop-types";

class Searchbar extends Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    }

    state= {
        query: '',
    }

    onChange = (e) => {
        this.setState({query: e.currentTarget.value.toLowerCase()})
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.query.trim());
        this.setState({query: ''});
    }

    render() {
        return (
        <header className={css.searchbar}>
            <form className={css.form} onSubmit={this.onSubmit}>
                <button type="submit" className={css.button} aria-label="Search">
                    <IoIosSearch style={{width: 25, height: 25}} />
                </button>
                <label className={css.label}>
                    <input
                    className={css.input}
                    type="text"
                    name="query"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={this.state.query}
                    onChange={this.onChange}
                    />
                </label>
            </form>
        </header>
        )
    }
};

export default Searchbar;