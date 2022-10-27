import { Divider, Spin } from 'antd';
import { useContext, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { PkgChildDetail } from '../../Api/util/apiUtil';
import { AppContext } from '../../contextProvider';
import { searchAPI } from '../headerUtils';
import * as _ from 'lodash';

const PAGE_SIZE = '10';
interface IApiSearchResProps {
  searchText: string;
  setLoadingSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
}

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
      }).then(({ list, pageNo, total }) => {
        apiPageNoRef.current = pageNo + 1;
        if (total === 0 || list.length === 0) {
          hasMoreRef.current = false;
          apiPageNoRef.current = 0;
        }
        setLoadingStatus(false);
        setSearchData((prev) => {
          return prev ? [...prev, ...list] : [...list];
        });
      });
    }
  };
  const getApiList = () => {
    if (!searchData || searchData.length === 0) {
      return <p>{formatMessage({ id: 'app.header.search.no-matching' })}</p>;
    }

    const groupData = _.groupBy(searchData, (item) => item.kindString);
    console.log(groupData);

    return Object.keys(groupData).map((type) => {
      return (
        <div key={type}>
          <h2>{type}</h2>
          {groupData[type].map((item) => {
            return (
              <>
                <p>{item.name}</p>
              </>
            );
          })}
          <Divider></Divider>
        </div>
      );
    });

    return searchData.map((data) => (
      <div key={data.id}>
        <span
          style={{ cursor: 'pointer' }}
          // onClick={() => {
          //   navigate(`/docs/${context.lang}/${data.filename.slice(0, -3)}`);
          // }}
        >
          {data.kindString}
          <Divider type='vertical' />
          {data.name}
        </span>
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
        hasMore={hasMoreRef.current}
        loader={<Spin size='small' />}
      >
        {getApiList()}
      </InfiniteScroll>
    </>
  );
};
export default ApiSearchRes;
