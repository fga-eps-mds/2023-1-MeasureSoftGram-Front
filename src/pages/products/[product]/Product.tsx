import React from 'react';
import Head from 'next/head';

import { NextPageWithLayout } from '@pages/_app.next';

import getLayout from '@components/Layout';
import useRequireAuth from '@hooks/useRequireAuth';

import { useQuery } from './hooks/useQuery';
import ProductContent from './components/ProductContent';

import RepositoriesList from './components/RepositoriesList';
import ReleasesList from './components/ReleasesList';

const Product: NextPageWithLayout = () => {
  useRequireAuth();
  const { repositoriesTsqmiHistory } = useQuery();

  return (
    <>
      <Head>
        <title>PRODUCT NAME</title>
      </Head>

      <ProductContent repositoriesTsqmiHistory={repositoriesTsqmiHistory} />
      <RepositoriesList />
      <ReleasesList />
    </>
  );
};

Product.getLayout = getLayout;

export default Product;
