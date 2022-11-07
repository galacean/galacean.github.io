import { Divider, Spin } from 'antd';
import { useContext, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../contextProvider';
import Source from '../../doc/components/Source';
import { MatchedDocs, searchDoc } from '../headerUtils';

const PAGE_SIZE = '10';
interface IExampleSearchResProps {
  searchText: string;
  setLoadingSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExampleSearchRes = (props: IExampleSearchResProps) => {
  const intl = useIntl();
  const formatMessage = intl.formatMessage;
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [searchData, setSearchData] = useState<MatchedDocs[]>([]);
  const examplePageNoRef = useRef(0);
  const hasMoreExampleRef = useRef(true);
  const isExampleLoadingRef = useRef(false);

  const setLoadingStatus = (loading: boolean) => {
    props.setLoadingSearchResult(loading);
    isExampleLoadingRef.current = loading;
  };

  const onloadMore = (pageNo: number) => {
    if (!isExampleLoadingRef.current && hasMoreExampleRef) {
      setLoadingStatus(true);
      searchDoc({
        version: context.version,
        title: props.searchText,
        content: props.searchText,
        pageSize: PAGE_SIZE,
        pageNo: examplePageNoRef.current.toString(),
        lang: context.lang,
      })
        .then(({ list, pageNo, total }) => {
          examplePageNoRef.current = pageNo + 1;
          if (total === 0 || list.length === 0) {
            hasMoreExampleRef.current = false;
            examplePageNoRef.current = 0;
          }
          setLoadingStatus(false);
          setSearchData((prev) => {
            return prev ? [...prev, ...list] : [...list];
          });
        })
        .catch(() => {
          // on request error: retry
          setLoadingStatus(false);
        });
    }
  };
  const getdocList = () => {
    const docList = searchData?.filter((item) => item.type === 'ts');
    if (!docList || docList.length === 0) {
      return <p>{formatMessage({ id: 'app.header.search.no-matching' })}</p>;
    }
    return docList.map((data) => (
      <div key={data.id}>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate(`/examples/${context.version}/${data.filename.slice(0, -3)}`);
          }}
        >
          {data.title}
          <Divider type='vertical' />
        </span>
        <Source src={data.htmlUrl} />
        <Divider />
      </div>
    ));
  };

  return (
    <>
      <InfiniteScroll
        useWindow={false}
        pageStart={0}
        loadMore={onloadMore}
        hasMore={hasMoreExampleRef.current}
        loader={<Spin size='small' />}
      >
        {getdocList()}
      </InfiniteScroll>
    </>
  );
};
export default ExampleSearchRes;
