import { Divider, Spin, Tabs } from 'antd';
import { useContext, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../contextProvider';
import Source from '../../doc/components/Source';
import Loading from '../../Loading';
import { APISearchResponse, MatchedDocs, searchDoc } from '../headerUtils';

interface ISearchResProps {
  searchText: string;
  setLoadingSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
}
const PAGE_SIZE = '10';

const SearchResult = (props: ISearchResProps) => {
  const intl = useIntl();
  const formatMessage = intl.formatMessage;
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [searchData, setSearchData] = useState<{
    doc: MatchedDocs[] | null;
    api: APISearchResponse | null;
  }>({ doc: null, api: null });
  const pageNoRef = useRef(0);
  const hasMoreRef = useRef(true);
  const isLoadingRef = useRef(false);

  const setLoadingStatus = (loading: boolean) => {
    props.setLoadingSearchResult(loading);
    isLoadingRef.current = loading;
  };

  const onloadMore = (pageNo: number) => {
    pageNoRef.current = Math.max(pageNo, pageNoRef.current);

    if (isLoadingRef.current) {
      return;
    }
    setLoadingStatus(true);
    searchDoc({
      version: context.version,
      title: props.searchText,
      content: props.searchText,
      pageSize: PAGE_SIZE,
      pageNo: (pageNo - 1).toString(),
      lang: context.lang,
    }).then(({ list, pageNo, total }) => {
      if (total === 0 || list.length === 0) {
        hasMoreRef.current = false;
      }
      setLoadingStatus(false);
      setSearchData((prev) => {
        const newDocData = prev.doc ? [...prev?.doc, ...list] : [...list];
        return { doc: newDocData, api: prev?.api };
      });
    });
  };

  useEffect(() => {
    if (!props.searchText) {
      return;
    }
    setSearchData({ doc: null, api: null });
    hasMoreRef.current = true;
  }, [props.searchText]);

  const getdocList = (type: 'markdown' | 'ts') => {
    const docList = searchData?.doc && searchData.doc.filter((item) => item.type === type);
    if (!docList || docList.length === 0) {
      return <p>{formatMessage({ id: 'app.header.search.no-matching' })}</p>;
    }
    return docList.map((data) => (
      <>
        <span
          key={data.id}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate(
              type === 'ts'
                ? `/examples/${data.filename.slice(0, -3)}`
                : `/docs/${context.lang}/${data.filename.slice(0, -3)}`
            );
          }}
        >
          {data.title}
          <Divider type='vertical' />
          <Source src={data.htmlUrl} />
        </span>
        <Divider />
      </>
    ));
  };

  const searchResultTab = (
    <div id='search-res-container'>
      <Tabs
        // defaultActiveKey={searchData?.doc ? '1' : '2'}
        defaultActiveKey={'1'}
        onChange={() => {}}
        items={[
          {
            label: formatMessage({ id: 'app.header.menu.engine.docs' }),
            key: '1',
            children: (
              <>
                <InfiniteScroll
                  useWindow={false}
                  key={props.searchText}
                  pageStart={0}
                  loadMore={onloadMore}
                  hasMore={hasMoreRef.current}
                  loader={<Spin size='small' />}
                >
                  {getdocList('markdown')}
                </InfiniteScroll>
              </>
            ),
          },
          {
            label: formatMessage({ id: 'app.header.menu.engine.examples' }),
            key: '2',
            children: (
              <>
                <InfiniteScroll
                  key={props.searchText}
                  threshold={10}
                  pageStart={0}
                  loadMore={onloadMore}
                  hasMore={hasMoreRef.current}
                  loader={<Spin size='small' />}
                >
                  {getdocList('ts')}
                </InfiniteScroll>
              </>
            ),
          },
          {
            label: `API`,
            key: '3',
            children: (
              <>
                {searchData?.api?.list?.map((data) => {
                  return (
                    <div key={data.id}>
                      <h6>{data.name}</h6>
                      <ul>
                        {data?.children?.map((child) => {
                          return <li key={child.id}>{child.name}</li>;
                        })}
                      </ul>
                    </div>
                  );
                })}
              </>
            ),
          },
        ]}
      />
    </div>
  );
  return searchResultTab;
};
export default SearchResult;