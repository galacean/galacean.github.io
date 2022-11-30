import { useContext, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Divider } from '../../../ui/Divider';
import { Spin } from '../../../ui/Spin';
import { AppContext } from '../../contextProvider';
import Source from '../../doc/components/Source';
import { MatchedDocs, searchDoc } from '../headerUtils';

const PAGE_SIZE = '10';
interface IDocSearchResProps {
  searchText: string;
  setLoadingSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocSearchRes = (props: IDocSearchResProps) => {
  const intl = useIntl();
  const formatMessage = intl.formatMessage;
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [searchData, setSearchData] = useState<MatchedDocs[]>([]);
  const docPageNoRef = useRef(0);
  const hasMoreDocRef = useRef(true);
  const isDocLoadingRef = useRef(false);

  const setLoadingStatus = (loading: boolean) => {
    props.setLoadingSearchResult(loading);
    isDocLoadingRef.current = loading;
  };

  const onloadMore = (pageNo: number) => {
    if (!isDocLoadingRef.current && hasMoreDocRef) {
      setLoadingStatus(true);
      searchDoc({
        version: context.version,
        title: props.searchText,
        content: props.searchText,
        pageSize: PAGE_SIZE,
        pageNo: docPageNoRef.current.toString(),
        lang: context.lang,
      })
        .then(({ list, pageNo, total }) => {
          docPageNoRef.current = pageNo + 1;
          if (total === 0 || list.length === 0) {
            hasMoreDocRef.current = false;
            docPageNoRef.current = 0;
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
    const docList = searchData?.filter((item) => item.type === 'markdown');
    if (!docList || docList.length === 0) {
      return <p>{formatMessage({ id: 'app.header.search.no-matching' })}</p>;
    }
    return docList.map((data) => (
      <div key={data.id}>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate(`/docs/${context.version}/${context.lang}/${data.filename.slice(0, -3)}`);
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
        hasMore={hasMoreDocRef.current}
        loader={<Spin />}
      >
        {getdocList()}
      </InfiniteScroll>
    </>
  );
};
export default DocSearchRes;
