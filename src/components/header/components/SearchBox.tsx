import { Input } from 'antd';
import * as _ from 'lodash';
import { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import SearchResult from './SearchResult';

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
  const debouncedLeadingSetSearchText = useCallback(
    _.debounce(
      (text: string) => {
        setSearchText(text);
      },
      1000,
      { leading: true, trailing: false }
    ),
    []
  );

  const searchBox = (
    <>
      <div id='search-box'>
        <Input.Search
          placeholder={formatMessage({ id: 'app.header.search.box' })}
          loading={loadingSearchResult}
          allowClear
          size='large'
          onChange={(e) => {
            debouncedSetSearchText(e.target.value);
          }}
          onSearch={(e) => {
            debouncedLeadingSetSearchText(e);
          }}
        />
        {searchText ? (
          <div
            id='header-search-result'
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
          </div>
        ) : null}
      </div>
    </>
  );
  return searchBox;
};
export default SearchBox;
