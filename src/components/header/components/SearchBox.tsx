import { Cancel, Search } from 'iconoir-react';
import * as _ from 'lodash';
import React, { useCallback, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { ActionButton } from '@oasis-engine/editor-components';
import { styled } from "@oasis-engine/editor-design-system";
import { Flex } from '@oasis-engine/editor-components';
import { Input } from '@oasis-engine/editor-components';
import { Spin } from '@oasis-engine/editor-components';
import SearchResult from './SearchResults';

const StyledSearchResult = styled("div", {
  position: "absolute",
  top: "$10",
  left: "0",
  maxHeight: "400px",
  width: "100%",
  overflow: "auto",
  zIndex: 9,
  backgroundColor: "$slate3",
  borderRadius: "$2",
  border: "1px solid $slate5",
  padding: "$2"
});

const SearchBox = () => {
  const intl = useIntl();
  const [searchText, setSearchText] = useState('');
  const formatMessage = intl.formatMessage;
  const [loadingSearchResult, setLoadingSearchResult] = useState(false);
  const inputEl = useRef(null);

  const clearText = () => {
    setSearchText("");
    if (inputEl.current) {
      inputEl.current.value = "";
    }
  }

  const debouncedSetSearchText = useCallback(
    _.debounce(
      (text: string) => {
        setSearchText(text);
      },
      1000,
      { leading: false, trailing: true }
    ),
    []
  );

  let endSlot = null;

  if (loadingSearchResult) {
    endSlot = <Spin size="sm" />
  }
  else if (searchText) {
    endSlot = <ActionButton size="md">
      <Cancel onClick={() => {
        clearText();
      }} />
    </ActionButton>
  }

  const searchBox = (
    <Flex align="both" css={{ margin: "0 $8", flex: 1, position: "relative" }}
      onBlur={(e) => {
        // DO NOT MODIFY THIS METHOD
        // Ref: https://gist.github.com/pstoica/4323d3e6e37e8a23dd59
        const currentTarget = e.currentTarget;
        // Check the newly focused element in the next tick of the event loop
        setTimeout(() => {
          // Check if the new activeElement is a child of the original container
          if (!currentTarget.contains(document.activeElement)) {
            // You can invoke a callback or add custom logic here
            clearText();
          }
        }, 0);
      }}
    >
      <Input
        placeholder={formatMessage({ id: 'app.header.search.box' })}
        startSlot={<Search />}
        endSlot={endSlot}
        size="md"
        ref={inputEl}
        onChange={(e) => {
          debouncedSetSearchText(e.target.value);
        }}
      ></Input>
      {searchText ? (
        <StyledSearchResult
        >
          <SearchResult {...{ searchText, setLoadingSearchResult }}></SearchResult>
        </StyledSearchResult>
      ) : null}
    </Flex>
  );
  return searchBox;
};
export default SearchBox;
