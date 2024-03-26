import { styled, Tabs, TabsContent, TabsList } from '@galacean/editor-ui';
import { Book, CodeBracketsSquare, Puzzle } from 'iconoir-react';
import { useContext } from 'react';
import { useIntl } from 'react-intl';
import { AppContext } from '../../contextProvider';
import { APISearchResponse, searchAPI, searchDoc } from '../headerUtils';
import DocSearchRes from './SearchResult';
import { useLocation } from 'react-router-dom';

interface ISearchResProps {
  searchText: string;
  setLoadingSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
}

const StyledTabList = styled(TabsList, {
  marginBottom: '$4',
  backgroundColor: 'transparent',
  gap: '$8',
  '& button': {
    transition: 'border-color 0.2s',
    border: 'none',
    borderBottom: '1px solid transparent',
    "&[data-state='active']": {
      backgroundColor: 'transparent',
      borderColor: '$blue10',
    },
  },
});

const SearchResult = (props: ISearchResProps) => {
  const intl = useIntl();
  const formatMessage = intl.formatMessage;
  const context = useContext(AppContext);

  const PAGE_SIZE = '20';

  const {pathname} = useLocation();
  let searchContext = 'docs';

  if (pathname.indexOf('/api/') > -1) {
    searchContext = 'api';
  }
  else if (pathname.indexOf('/examples/') > -1) {
    searchContext = 'examples';
  }

  const searchResultTab = (
    <Tabs defaultValue={searchContext} closable>
      <StyledTabList
        tabs={[
          {
            value: 'docs',
            label: formatMessage({ id: 'app.header.menu.engine.docs' }),
          },
          {
            value: 'examples',
            label: formatMessage({ id: 'app.header.menu.engine.examples' }),
          },
          {
            value: 'api',
            label: 'API',
          },
        ]}
      />
      <TabsContent value='docs'>
        <DocSearchRes
          {...{
            // force reset state
            // Ref: https://beta.reactjs.org/learn/preserving-and-resetting-state#resetting-a-form-with-a-key
            key: props.searchText,
            filter: (data: any) => data.type === 'markdown',
            search: () =>
              searchDoc({
                version: context.version,
                title: props.searchText,
                content: props.searchText,
                pageSize: PAGE_SIZE,
                pageNo: '0',
                type: 'markdown',
                lang: context.lang === 'cn' ? 'zh-CN' : 'en',
              }),
            category: 'category',
            categoryReg: /\ntype:(.+)\n/,
            link: (data: any) => {
              let title = data.filename.slice(0, -3);

              if (context.lang === 'cn') {
                title = title.replace('.zh-CN', '');
              }

              return `/docs/${context.version}/${context.lang}/${title}`;
            },
            setLoadingSearchResult: props.setLoadingSearchResult,
            icon: <Book />,
          }}
        ></DocSearchRes>
      </TabsContent>
      <TabsContent value='examples'>
        <DocSearchRes
          {...{
            // force reset state
            // Ref: https://beta.reactjs.org/learn/preserving-and-resetting-state#resetting-a-form-with-a-key
            key: props.searchText,
            filter: (data: any) => data.type === 'ts',
            search: () =>
              searchDoc({
                version: context.version,
                title: props.searchText,
                content: props.searchText,
                pageSize: PAGE_SIZE,
                pageNo: '0',
                type: 'ts',
              }),
            category: 'category',
            categoryReg: /\n\s?[*]\s?@category(.+)\n/,
            link: (data: any) =>
              `/examples/${context.version}/${data.filename.slice(0, -3)}`,
            setLoadingSearchResult: props.setLoadingSearchResult,
            icon: <CodeBracketsSquare />,
          }}
        ></DocSearchRes>
      </TabsContent>
      <TabsContent value='api'>
        <DocSearchRes
          {...{
            key: props.searchText,
            filter: (data: any) => !!data.kindString,
            search: () =>
              searchAPI({
                version: context.version,
                key: props.searchText,
                pageSize: PAGE_SIZE,
                pageNo: '0',
              }),
            category: 'kindString',
            link: (data: ArrayElement<APISearchResponse['list']>) =>
              `/api/${context.version}/${data.pkg}/${data.name}`,
            setLoadingSearchResult: props.setLoadingSearchResult,
            icon: <Puzzle />,
          }}
        ></DocSearchRes>
      </TabsContent>
    </Tabs>
  );
  return searchResultTab;
};
export default SearchResult;
