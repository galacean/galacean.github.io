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
      </div>
      <>
        {searchText ? (
          <div id='header-search-result'>
            <SearchResult {...{ searchText }}></SearchResult>
          </div>
        ) : null}
      </>
    </>
  );
  return searchBox;
};
export default SearchBox;
