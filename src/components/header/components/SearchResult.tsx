import { Tabs } from 'antd';
import { useIntl } from 'react-intl';
import ApiSearchRes from './ApiSearchRes';
import DocSearchRes from './DocSearchRes';
import ExampleSearchRes from './ExampleSearchRes';

interface ISearchResProps {
  searchText: string;
  setLoadingSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchResult = (props: ISearchResProps) => {
  const intl = useIntl();
  const formatMessage = intl.formatMessage;

  const searchResultTab = (
    <div id='search-res-container'>
      <Tabs
        defaultActiveKey={'1'}
        items={[
          {
            label: formatMessage({ id: 'app.header.menu.engine.docs' }),
            key: '1',
            children: (
              <DocSearchRes
                {...{
                  // force reset state
                  // Ref: https://beta.reactjs.org/learn/preserving-and-resetting-state#resetting-a-form-with-a-key
                  key: props.searchText,
                  searchText: props.searchText,
                  setLoadingSearchResult: props.setLoadingSearchResult,
                }}
              ></DocSearchRes>
            ),
          },
          {
            label: formatMessage({ id: 'app.header.menu.engine.examples' }),
            key: '2',
            children: (
              <ExampleSearchRes
                {...{
                  // force reset state
                  // Ref: https://beta.reactjs.org/learn/preserving-and-resetting-state#resetting-a-form-with-a-key
                  key: props.searchText,
                  searchText: props.searchText,
                  setLoadingSearchResult: props.setLoadingSearchResult,
                }}
              ></ExampleSearchRes>
            ),
          },
          {
            label: `API`,
            key: '3',
            children: (
              <ApiSearchRes
                {...{
                  key: props.searchText,
                  searchText: props.searchText,
                  setLoadingSearchResult: props.setLoadingSearchResult,
                }}
              ></ApiSearchRes>
            ),
          },
        ]}
      />
    </div>
  );
  return searchResultTab;
};
export default SearchResult;
