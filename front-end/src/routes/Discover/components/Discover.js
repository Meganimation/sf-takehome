import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import makeRequest, {PATH, RESOURCE} from '../api/makeRequest';

import styled, {keyframes, css} from 'styled-components'


const loaderAnimation = keyframes`
 0% {
  transform: rotate(0deg);
  border: 36px solid #f3f3f3; 
  border-top: 36px solid darkGray;
 }
  100% {
    border: 6px solid #f3f3f3; 
    border-top: 6px solid darkGray; 
    transform: rotate(360deg);
  }
}
`

const loaderAnimationRule = css`
  ${loaderAnimation} 1.5s infinite alternate;
`


const Loader = styled.div`
  border: 6px solid #f3f3f3; 
  border-top: 6px solid lightGray; 
  border-radius: 50%;
  width: 70px;
  height: 70px;
  animation: ${loaderAnimationRule};
`

export default class Discover extends Component {
  
  constructor() {
    super();

    this.state = {
      categories: {
        data: [],
        loading: true,
        error: false,
        errorMsg: ''
      },
      newReleases: {
        data: [],
        loading: true,
        error: false,
        errorMsg: ''
      },
      playlists: {
        data: [],
        loading: true,
        error: false,
        errorMsg: ''
      }
    };
  }
  componentDidMount() {
    this.asyncAction({
      path: PATH.new,
      name: 'newReleases',
      resource: RESOURCE.albums
    });
    this.asyncAction({
      path: PATH.featured,
      name: 'playlists',
      resource: RESOURCE.playlists
    });
    this.asyncAction({
      path: PATH.categories,
      name: 'categories',
      resource: RESOURCE.categories
    });
  }



  async asyncAction(url) {
    makeRequest(url.path, url.resource).then(data => {
      this.setState({
        ...this.state,
        [url.name]: {
          data,
          loading: false,
          error: false
        }
      });
    }).catch(error => {
      this.setState({
        ...this.state,
        [url.name]: {
          error: true,
          errorMsg: error
        }
      });
    });
  }

 

  render() {
    const { newReleases, playlists, categories } = this.state;


    return (
      <div className="discover">
        {newReleases.loading ? <Loader /> : newReleases.error ? <ErrorMessage error={newReleases.errorMsg} /> : <DiscoverBlock text="RELEASED THIS WEEK" id="released" {...newReleases} /> }
        {playlists.loading ?  <Loader /> : playlists.error ? <ErrorMessage error={playlists.errorMsg} /> : <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" {...playlists} /> }
        {categories.loading ?  <Loader /> : categories.error ? <ErrorMessage error={categories.errorMsg} /> : <DiscoverBlock text="BROWSE" id="browse" imagesKey="icons" {...categories} /> }
      </div>
    );
  }
}

function ErrorMessage({ error }) {

  return(
    <section style={{
      display: 'flex', 
      justifyContent: 'center'
      }}>
        <div style={{
          position: 'absolute',
          height: '50px', 
          width: '50px', 
          background: 'red', 
          borderRadius: '100px'}}
          >
            <h1 style={{fontSize: '50px', textAlign: 'center', color: 'white', margin: 'auto'}}>!</h1>
        </div>
            <h3 style={{position: 'inherit', marginTop: '60px'}}> {error.toString()} </h3>
  </section>)

}
