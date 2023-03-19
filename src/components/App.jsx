import React, {Component} from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { fetchImages } from "../api/api";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    pictures: [],
    showButton: false,
    loading: false,
  }

  async componentDidUpdate(_, prevState) {

    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {

      this.setState({
        loading: true,
      });

      try {
        const { hits, totalHits } = await fetchImages(this.state.query, this.state.page);
        const loadedPictures = hits.reduce((acc, {id, webformatURL, largeImageURL, tags}) => {
          acc.push({id, webformatURL, largeImageURL, tags});
          return acc;
        }, []);

        if (loadedPictures.length === 0) {
          throw new Error('Sorry, there are no images with such name');
        };

        if (this.state.page === 1) {
           toast[`success`](`${totalHits} images found`)
        };

        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...loadedPictures],
        }));

        if (this.state.page >= Math.ceil(totalHits / 12)) {
          return this.setState({
            showButton: false,
          });
        };

        this.setState({
          showButton: true,
        })
      } catch (error) {
        toast['error'] (error.message);

      } finally {
        this.setState({
          loading: false,
        });
      }
    }
  }

  onSearchSubmit = (query) => {

    if (query.trim() === '') {
      return toast['error']('Please, type something to find images');
    };
    
    this.setState({
      query, 
      page: 1,
      pictures: [],
      showButton: false,
    })

  }

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page +1,
    }))
  }

  render() {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gridGap: "16px",
          paddingBottom: "24px",
        }}
      >
        <Searchbar onSubmit={this.onSearchSubmit}/>
        {this.state.pictures.length !== 0 && <ImageGallery pictures={this.state.pictures}/>}
        {this.state.showButton && <Button onClick={this.onLoadMore} >Load more</Button>}
        {this.state.loading && <Loader/>}
        <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"></ToastContainer>
      </div>
    );
  }
}