import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Head from 'next/head';
import { withRouter, NextRouter } from 'next/router';

import { InventoryForm, LoadingView } from '@/components';
import { AppState, IBreadcrumbListItem } from '@/types';


const imagesUrl = 'https://assets.randyscandies.liobr.dev/media/images';

class Home extends Component<Props, State> {
  private loadingTimeout?: ReturnType<typeof setTimeout>;

  constructor(props: Props) {
    super(props);

    this.state = {
      imageLoaded: false,
      imageError: false,
    };

    this.isImageLoaded = this.isImageLoaded.bind(this);
    this.loadingTimeout = undefined;
  }

  isImageLoaded() {
    const img = document.getElementById('bgImg') as HTMLImageElement | null;
    return !!img && img.complete && img.naturalHeight !== 0;
  }

  componentDidMount() {
    if (this.isImageLoaded()) return this.setState({ imageLoaded: true });

    let counter = 60;

    const recursiveCheck = () => {
      this.loadingTimeout = setTimeout(() => {
        --counter;

        if (this.isImageLoaded()) this.setState({ imageLoaded: true });
        else if (counter === 0) {
          this.setState({ imageError: true });
          console.error('Media did not load within a reasonable time frame!');
        } else recursiveCheck();
      }, 1000);
    };

    recursiveCheck();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (!prevState.imageLoaded && this.state.imageLoaded) {
      const img = document.getElementById('bgImg') as HTMLImageElement | null;
      if (img) img.style.left = `${(window.innerWidth - img.width) / 2}px`;
    }
  }

  componentWillUnmount() {
    if (this.loadingTimeout) clearTimeout(this.loadingTimeout);
  }

  render() {
    const { imageError, imageLoaded } = this.state;

    const breadcrumbList: IBreadcrumbListItem[] = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://randyscandies.liobr.dev"
      }
    ];

    const breadcrumb = JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbList
    });

    return (
      <>
        <Head>
          <title>Inventory &mdash; Randy&apos;s Candies</title>
          <script type="application/ld+json">{breadcrumb}</script>
        </Head>
        <LoadingView
          className={`LoadingView--fullscreen${
            imageLoaded || imageError ? ' is-loaded' : ''
          }`}
          isFullscreen
          isLoaded={imageLoaded || imageError}
        />
        <main className='Page Page--home'>
          <section className='Section Section--inventory'>
            <div className='Inventory-background'>
              <img id='bgImg' src={`${imagesUrl}/circles.png`} alt='bg' />
            </div>
            <div className='Inventory'>
              <div className='Inventory-info'>
                <div className='Inventory-info-text'>
                  <h1>Randy&apos;s <b>Candies</b></h1>
                  <h2>
                    Proudly serving Downtown Chicago since about a week ago
                  </h2>
                </div>
              </div>
              <InventoryForm />
            </div>
          </section>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  items: state.inventory.items,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  router: NextRouter;
}

interface State {
  imageLoaded: boolean;
  imageError: boolean;
}

export default withRouter(connector(Home));