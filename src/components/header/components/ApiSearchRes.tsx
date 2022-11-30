import * as _ from 'lodash';
import { useContext, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../ui/Button';
import { Spin } from '../../../ui/Spin';
import { PkgChildDetail } from '../../Api/util/apiUtil';
import { AppContext } from '../../contextProvider';
import Source from '../../doc/components/Source';
import { searchAPI } from '../headerUtils';

const PAGE_SIZE = '10';
interface IApiSearchResProps {
  searchText: string;
  setLoadingSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResultList = (props: { dataSource: PkgChildDetail[]; type: string }) => {
  const { type, dataSource } = props;
  const [pageSize, setPageSize] = useState(5);

  const onLoadMore = () => {
    setPageSize((prev) => 2 * prev);
  };
  const loadMore =
    pageSize < dataSource.length ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>
          <FormattedMessage id='app.header.search.more'></FormattedMessage>
        </Button>
      </div>
    ) : null;
  return (
    <div key={type}>
      <ul
        dataSource={dataSource.slice(0, pageSize)}
        loadMore={loadMore}
        renderItem={(item) => (
          <li>
            <a href={item.sources[0].url} target='_blank'>
              {item.name}
            </a>
            <Source src={item.sources[0].url} />
            <p>{item.comment?.summary.map((item) => item.text).join()}</p>
          </li>
        )}
      />
    </div>
  );
};

const ApiSearchRes = (props: IApiSearchResProps) => {
  const intl = useIntl();
  const formatMessage = intl.formatMessage;
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [searchData, setSearchData] = useState<PkgChildDetail[]>([]);
  const apiPageNoRef = useRef(0);
  const hasMoreRef = useRef(true);
  const isApiLoadingRef = useRef(false);

  const setLoadingStatus = (loading: boolean) => {
    props.setLoadingSearchResult(loading);
    isApiLoadingRef.current = loading;
  };

  const onloadMore = (pageNo: number) => {
    if (!isApiLoadingRef.current && hasMoreRef) {
      setLoadingStatus(true);
      searchAPI({
        version: context.version,
        key: props.searchText,
        pageSize: PAGE_SIZE,
        pageNo: apiPageNoRef.current.toString(),
      })
        .then(({ list, pageNo, total }) => {
          apiPageNoRef.current = pageNo + 1;
          if (total === 0 || list.length === 0) {
            hasMoreRef.current = false;
            apiPageNoRef.current = 0;
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
  const getApiList = () => {
    if (!searchData || searchData.length === 0) {
      return <p>{formatMessage({ id: 'app.header.search.no-matching' })}</p>;
    }

    const groupData = _.groupBy(searchData, (item) => item.kindString);

    return Object.keys(groupData).map((type) => {
      return <ResultList dataSource={groupData[type]} type={type}></ResultList>;
    });
  };

  return (
    <>
      <InfiniteScroll
        useWindow={false}
        pageStart={0}
        loadMore={onloadMore}
        hasMore={hasMoreRef.current}
        loader={<Spin />}
      >
        {getApiList()}
      </InfiniteScroll>
    </>
  );
};
export default ApiSearchRes;
