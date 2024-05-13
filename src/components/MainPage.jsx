import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Input, Button, SimpleGrid } from '@chakra-ui/react';
import Pagination from './Pagination';
import { repositries } from '../mock/mock';
import NotFound from './NotFound';

const MainPage = () => {
  const [repos, setRepos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedRepos, setDisplayedRepos] = useState([]);
  const reposPerPage = 5;

  useEffect(() => {
    // Fetch data from GitHub API
    fetch(`https://api.github.com/users/oladunkevictoria/repos`)
      .then((response) => response.json())
      .then((data) => {
        setRepos(data);
        setDisplayedRepos(data.slice(0, reposPerPage)); // Display first `reposPerPage` repos initially
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  //   useEffect(() => {
  //   // Fetch data from GitHub API
  //   try{
  //     setRepos(repositries)

  //   }catch (error){ console.error('Error fetching data:', error)};
  // }, []);

  const handleSearch = () => {
    // Implement search logic
    // For simplicity, filtering based on repo name
    const filteredRepos = repos.filter((repo) =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedRepos(filteredRepos.slice(0, reposPerPage)); // Display first `reposPerPage` filtered repos
    setCurrentPage(1); // Reset pagination when performing a new search
  };

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = displayedRepos.slice(indexOfFirstRepo, indexOfLastRepo);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const start = (pageNumber - 1) * reposPerPage;
    const end = start + reposPerPage;
    setDisplayedRepos(repos.slice(start, end));
  };

  return (
    <Box>
      <Input
        placeholder="Search projects"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
      <SimpleGrid columns={1} spacing={4}>
        {currentRepos.map((repo) => (
          <RouterLink to={`/details/${repo.id}`} key={repo.id}>
            <Box p={5} shadow="md" borderWidth="1px">
              <h2>{repo.name}</h2>
              <p>{repo.description}</p>
            </Box>
          </RouterLink>
        ))}
      </SimpleGrid>
      <Pagination
        reposPerPage={reposPerPage}
        totalRepos={repos.length}
        paginate={paginate}
      />
    </Box>
  );
};

export default MainPage;



// import React, { useState, useEffect } from 'react';
// import { Link as RouterLink } from 'react-router-dom'; // Import as RouterLink
// import { Box, Input, Button, SimpleGrid } from '@chakra-ui/react';
// import Pagination from './Pagination';
// import NotFound from './NotFound'; // Import NotFound component
// import { repositries } from '../mock/mock';


// const MainPage = () => {
//   const [repos, setRepos] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchResults, setSearchResults] = useState([]);
//   const reposPerPage = 1;

//   // useEffect(() => {
//   //   // Fetch data from GitHub API
//   //   fetch(`https://api.github.com/users/oladunkevictoria/repos`)
//   //     .then((response) => response.json())
//   //     .then((data) => {console.log(data); setRepos(data)})
//   //     .catch((error) => console.error('Error fetching data:', error));
//   // }, []);
//   useEffect(() => {
//     // Fetch data from GitHub API
//     try{
//       setRepos(repositries)

//     }catch (error){ console.error('Error fetching data:', error)};
//   }, []);

//   const handleSearch = () => {
//     // Implement search logic
//     // For simplicity, filtering based on repo name
//     const filteredRepos = repos.filter((repo) =>
//       repo.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setSearchResults(filteredRepos);
//     setCurrentPage(1); // Reset pagination when performing a new search
//   };

//   const indexOfLastRepo = currentPage * reposPerPage;
//   const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
//   const currentRepos = searchResults.slice(indexOfFirstRepo, indexOfLastRepo);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <Box>
//       <Input
//         placeholder="Search projects"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <Button onClick={handleSearch}>Search</Button>
//       {searchResults.length === 0 && searchTerm !== '' ? (
//         <NotFound />
//       ) : (
//         <>
//           <SimpleGrid columns={1} spacing={4}>
//             {currentRepos.map((repo) => (
//               <RouterLink to={`/details/${repo.id}`} key={repo.id}>
              
//                 <Box p={5} shadow="md" borderWidth="1px">
//                   <h2>{repo.name}</h2>
//                   <p>{repo.description}</p>
//                 </Box>
             
//               </RouterLink>
//             ))}
//           </SimpleGrid>
//           <Pagination
//             reposPerPage={reposPerPage}
//             totalRepos={searchResults.length}
//             paginate={paginate}
//           />
//         </>
//       )}
//     </Box>
//   );
// };

// export default MainPage;

// MainPage.jsx