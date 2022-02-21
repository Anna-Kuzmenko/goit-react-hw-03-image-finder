import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';

import './Searchbar.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  HendleSubmit = event => {
    event.preventDefault();

    if (this.state.searchValue.trim() === '') {
      toast.warn('Введите запрос');
      // alert('введите запрос');
      return;
    }

    this.props.onSubmit(this.state.searchValue);

    this.setState({ searchValue: '' });
  };

  hendleValueChange = event => {
    this.setState({ searchValue: event.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.HendleSubmit}>
          <button className="SearchForm-button" type="submit">
            <FaSearch style={{ marginRight: 5 }} />
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.hendleValueChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
