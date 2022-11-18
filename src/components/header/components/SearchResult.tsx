import { useIntl } from 'react-intl';
import { Tabs, TabsContent, TabsList } from '../../../ui/Tabs';
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
    <Tabs defaultValue="docs" closable>
      <TabsList
        tabs={[
          {
            value: "docs",
            label: formatMessage({ id: 'app.header.menu.engine.docs' })
          },
          {
            value: "examples",
            label: formatMessage({ id: 'app.header.menu.engine.examples' })
          },
          {
            value: "api",
            label: "API"
          }
        ]}
      />
      <TabsContent value="docs">
        <DocSearchRes
          {...{
            // force reset state
            // Ref: https://beta.reactjs.org/learn/preserving-and-resetting-state#resetting-a-form-with-a-key
            key: props.searchText,
            searchText: props.searchText,
            setLoadingSearchResult: props.setLoadingSearchResult,
          }}
        ></DocSearchRes>
      </TabsContent>
      <TabsContent value="examples">
        <ExampleSearchRes
          {...{
            // force reset state
            // Ref: https://beta.reactjs.org/learn/preserving-and-resetting-state#resetting-a-form-with-a-key
            key: props.searchText,
            searchText: props.searchText,
            setLoadingSearchResult: props.setLoadingSearchResult,
          }}
        ></ExampleSearchRes>

      </TabsContent>
      <TabsContent value="api">

        <ApiSearchRes
          {...{
            key: props.searchText,
            searchText: props.searchText,
            setLoadingSearchResult: props.setLoadingSearchResult,
          }}
        ></ApiSearchRes>
      </TabsContent>
    </Tabs>
  );
  return searchResultTab;
};
export default SearchResult;
