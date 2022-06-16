import React, { Component, ReactNode } from 'react';
import throttle from 'lodash/throttle';

import Head from 'next/head';
import { NextRouter, withRouter } from 'next/router';


const description = "Candy store inventory app for TopBloc code challenge.";

class RootComponent extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleResize = throttle(this.handleResize.bind(this), 200, {
      leading: true,
    });
  }

  handleResize() {
    document.body.style.height = window.innerHeight + 'px';

    if (this.props.router.pathname === '/') {
      const img = document.getElementById('bgImg') as HTMLImageElement | null;
      if (img) img.style.left = `${(window.innerWidth - img.width) / 2}px`;
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    setTimeout(() => {
      this.handleResize();
    }, 100);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            sizes="32x32"
            href="/favicon.ico"
          />
          <meta name="msapplication-TileColor" content="#0492C2" />
          <meta name="theme-color" content="#0492C2" />
          <meta itemProp="name" content="Randy&apos;s Candies" />
          <meta itemProp="description" content={description} />
          <meta name="description" content={description} />
          <meta property="og:title" content="Randy&apos;s Candies" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://randyscandies.liobr.dev" />
          <meta property="og:description" content={description} />
        </Head>
        <div className='SiteContainer'>
          {this.props.children}
        </div>
      </>
    );    
  }
}

interface Props {
  children: ReactNode;
  router: NextRouter;
}

export default withRouter(RootComponent);
