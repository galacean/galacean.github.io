import * as _ from 'lodash';
import { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { Input } from '../../../ui/Input';
import SearchResult from './SearchResult';
import { Search } from 'iconoir-react';
import { Spin } from '../../../ui/Spin';
import { Flex } from '../../../ui/Flex';
import { styled } from '../../../ui/design-system';

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

  const searchBox = (
    <Flex align="both" css={{margin: "0 $6", flex: 1, position: "relative"}}>
      <Input
        placeholder={formatMessage({ id: 'app.header.search.box' })}
        startSlot={<Search />}
        endSlot={loadingSearchResult ? <Spin size="sm" /> : null}
        size="md"
        onChange={(e) => {
          debouncedSetSearchText(e.target.value);
        }}
      ></Input>
      {searchText ? (
        <StyledSearchResult
          onBlur={(e) => {
            // DO NOT MODIFY THIS METHOD
            // Ref: https://gist.github.com/pstoica/4323d3e6e37e8a23dd59
            const currentTarget = e.currentTarget;
            // Check the newly focused element in the next tick of the event loop
            setTimeout(() => {
              // Check if the new activeElement is a child of the original container
              if (!currentTarget.contains(document.activeElement)) {
                // You can invoke a callback or add custom logic here
                setSearchText('');
              }
            }, 0);
          }}
        >
          <SearchResult {...{ searchText, setLoadingSearchResult }}></SearchResult>
        </StyledSearchResult>
      ) : null}
    </Flex>
  );
  return searchBox;
};
export default SearchBox;
