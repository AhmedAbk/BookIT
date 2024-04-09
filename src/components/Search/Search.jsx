import React, { useState } from 'react';
import SearchResultItem from './SearchResultItem';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const test = [
    { city: 'france' },
    { city: 'africa' },
    { city: 'australia' },
    { city: 'united states' },
    { city: 'united kingdom' },
    { city: 'asia' },
  ];
  const filteredResults = test.filter((el) =>
  el.city.trim().toLowerCase().includes(searchQuery.trim().toLowerCase())
);


  return (
    <div>
      <div className="container-fluid booking mt-5 pb-3">
        <div className="container pb-3">
          <div className="bg-light shadow" style={{ padding: '15px' }}>
            <div
              className="row align-items-center"
              style={{ minHeight: '40px' }}
            >
              <div className="col-md-10 ">
                <div className="row">
                  <div className="col-md-3 ">
                    <form>
                      <input
                        type="text"
                        name="s"
                        id="searchInput"
                        value={searchQuery}
                        className='form-control col-md-14'
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </div>
      </div>  
      {searchQuery && (
        <div className="result-container row">
          {filteredResults.map((result, index) => (
            <SearchResultItem
              key={index}
              city={result.city}
              description="Discover amazing places of the world with us"  
          
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
