
import React from 'react';
import { Box, Button } from '@chakra-ui/react';

const Pagination = ({ reposPerPage, totalRepos, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRepos / reposPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Box mt={5} textAlign="center">
      {pageNumbers.map((number) => (
        <Button key={number} onClick={() => paginate(number)} mx={1}>
          {number}
        </Button>
      ))}
    </Box>
  );
};

export default Pagination;
