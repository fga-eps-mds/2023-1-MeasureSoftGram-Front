import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Breadcrumbs as BreadcrumbsMUI, Typography, Box } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { TRANSLATION } from './consts';

export function Breadcrumbs() {
  const router = useRouter();

  function getPathName(name: string) {
    const nameArray = name.split('-');
    return nameArray.slice(1).join('-');
  }

  const getCrumbs = () => {
    const { asPath } = router;
    const currentPath: string[] = [];
    const pathArray = asPath.split('/').slice(1);

    const paths = pathArray
      .map((path, index) => {
        currentPath.push(path);

        if (pathArray[0] === '') {
          return (
            <Typography color="text.primary" variant="subtitle1" key={path}>
              Produtos
            </Typography>
          );
        }

        if (pathArray.length === index + 1)
          return (
            <Typography color="text.primary" variant="subtitle1" key={path}>
              {TRANSLATION[path] || getPathName(path)}
            </Typography>
          );

        return (
          <Typography key={path} variant="subtitle1">
            <Link href={`/${currentPath.join('/')}`}>{TRANSLATION[path] || getPathName(path)}</Link>
          </Typography>
        );
      })
      // ?.filter((data) => data.key !== 'releases' && !Number.isNaN(data?.key)); // remove releases key;

    paths.unshift(
      <Link key="/home" href="/home">
        <Box
          sx={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <HomeOutlinedIcon
            sx={{
              cursor: "pointer",
              fontSize: "25px"
            }}
          />
        </Box>
      </Link>
    )

    return paths
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column"
        }}
    >
      <BreadcrumbsMUI
        separator={ <NavigateNextIcon fontSize="small" /> }
        sx={{
          display: "flex",
          alignItems: "center",
          gap: ".1rem",
          '.MuiBreadcrumbs-separator': {
            margin: "0px"
          }
        }}
      >
        {getCrumbs()}
      </BreadcrumbsMUI>
      <Box
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: "#000000",
          opacity: "60%",
          marginTop: "5px",
          borderRadius: ".5px"
        }}
      />
    </Box>
);
}
