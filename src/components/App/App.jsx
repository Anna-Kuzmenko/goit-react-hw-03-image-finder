import React, { Component } from 'react';

import './App.css';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from 'components/Modal/Modal';
import { getImages } from '../services/imagesApi';
import { ToastContainer, toast } from 'react-toastify';

class App extends Component {
  state = {
    searchValue: '',
    imagesArr: [],
    page: 1,
    perPage: 12,
    totalPages: 0,
    loading: false,
    error: null,
    largeImageURL: '',
    showModal: false,
  };

  async componentDidUpdate(_, prevState) {
    const prevSearchValue = prevState.searchValue;
    const nextSearchValue = this.state.searchValue;
    const { searchValue, page, perPage } = this.state;

    if (prevSearchValue !== nextSearchValue || prevState.page !== page) {
      try {
        this.setState({ loading: true });

        await getImages(nextSearchValue, page, perPage).then(images => {
          if (images.hits.length === 0) {
            toast.error(
              `No pictures ${searchValue}. Please, try another request`
            );
            return this.setState({ imagesArr: [] });
          }

          this.setState(prevState => {
            return {
              imagesArr: [
                ...prevState.imagesArr,
                ...images.hits.map(
                  ({ id, webformatURL, largeImageURL, tags }) => ({
                    id,
                    webformatURL,
                    largeImageURL,
                    tags,
                  })
                ),
              ],
              totalPages: images.totalHits / perPage,
            };
          });

          if (page > this.state.totalPages) {
            return toast.error(
              `No more pictures ${searchValue}. Try new request`
            );
          }
        });
      } catch (error) {
        this.setState(this.state.error);
        toast.error(
          `Whoops, something went wrong: ${this.state.error.message}. Try new request`
        );
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  HendleFormSubmit = searchValue => {
    this.setState({
      searchValue: searchValue,
      page: 1,
      imagesArr: [],
      loading: false,
      error: null,
    });
  };

  LoadMoreBtnCklick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onModal = ({ largeImageURL, tags }) => {
    this.setState({
      largeImageURL: largeImageURL,
      tags: tags,
    });
    this.toggleModal();
  };

  render() {
    const { imagesArr, page, totalPages, showModal, largeImageURL, tags } =
      this.state;
    const renderLoadMoreBtn = imagesArr.length > 0 && page < totalPages;

    return (
      <div className="App">
        <Searchbar onSubmit={this.HendleFormSubmit} />
        {this.state.loading && <Loader />}
        <ImageGallery imagesArr={imagesArr} onClick={this.onModal} />
        {renderLoadMoreBtn && <Button onClick={this.LoadMoreBtnCklick} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;

// Your API key: 25802713-e226c9b2d7aa04108ed842121

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
