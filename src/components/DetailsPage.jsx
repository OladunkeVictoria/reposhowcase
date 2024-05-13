import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/react';

const DetailsPage = () => {
  const { repoId } = useParams();
  console.log(repoId);
  const [repoDetails, setRepoDetails] = useState(null);

  useEffect(() => {
    // Fetch repository details from GitHub API
    fetch(`https://api.github.com/repositories/${repoId}`)
      .then((response) => response.json())
      .then((data) => setRepoDetails(data))
      .catch((error) => console.error('Error fetching repo details:', error));
  }, [repoId]);

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      {repoDetails ? (
        <>
          <h1>{repoDetails.name}</h1>
          <p>{repoDetails.description}</p>
          <p>Stars: {repoDetails.stargazers_count}</p>
          <p>{repoDetails.language}</p>
          {/* Display other repository details */}
        </>
      ) : (
        <p>Loading...</p>
      )}

      <Button as={RouterLink} to="/" mt={4}>
        Back to Main Page
      </Button>
    </Box>
  );
};

export default DetailsPage;
