import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Head from 'next/head';
import { withRouter, NextRouter } from 'next/router';

import { InventoryForm } from '@/components';
import { AppState, IBreadcrumbListItem } from '@/types';


const imagesUrl = 'https://assets.randyscandies.liobr.dev/media/images';

class Home extends Component<Props> {
  render() {
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

export default withRouter(connector(Home));