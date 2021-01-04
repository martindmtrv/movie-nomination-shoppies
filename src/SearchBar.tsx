import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';

export interface ISearchBarProps {
    isDisabled?: boolean;
    onSearch?: (e: any) => void;
}

function SearchBar({ isDisabled, onSearch }: ISearchBarProps) {
  return (
    <form onSubmit={(e: any) => {
      e.preventDefault();
      console.log(e.target[0].value);
      onSearch && onSearch(e.target[0].value);
    }}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input isDisabled={isDisabled} onSubmit={() => console.log("submitted")} type="text" placeholder="Search OMDB..." />
      </InputGroup>  
    </form>      
  );
}

export default SearchBar;
