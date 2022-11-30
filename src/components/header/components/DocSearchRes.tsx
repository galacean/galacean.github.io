import { useContext, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { styled } from '../../../ui/design-system';
import { Spin } from '../../../ui/Spin';
import { AppContext } from '../../contextProvider';
import { MatchedDocs, searchDoc } from '../headerUtils';
import { Book, InfoEmpty } from "iconoir-react";
import { Flex } from '../../../ui/Flex';

const PAGE_SIZE = '10';
interface IDocSearchResProps {
  searchText: string;
  setLoadingSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
}

const StyledList = styled("ul", {
  display: "flex",
  flexDirection: "column",
  gap: "$1",
});

const StyledItem = styled("li", {
  cursor: "pointer",
  backgroundColor: "$slate5",
  borderRadius: "$2",
  padding: "$3 $2",
  fontSize: "$2",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "$2",
  border: "2px solid $slate5",
  transition: "border-color 0.2s",
  "&:hover": {
    borderColor: "$blue10"
  }
});

const StyledSection = styled("section", {
  paddingBottom: "$4",
  margin: "0 $2"
});

const StyledSectionTitle = styled("h4", {
  color: "$blue10",
  padding: "0 $2 $2 $1"
});

const StyledNoResult = styled(Flex, {
  fontSize: "$2",
  padding: "$2",
  color: "$slate11"
});

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
      return <StyledNoResult align="both" gap="sm">
        <InfoEmpty />
        <span>{formatMessage({ id: 'app.header.search.no-matching' })}</span>
      </StyledNoResult>;
    }

    const typedDocs: Record<string, any> = {};
    const reg = /\ntype:(.+)\n/;

    docList.forEach(data => {
      const res = reg.exec(data.content)
      let type: string;

      if (res && res[1]) {
        type = res[1].trim();

        if (type) {
          if (!typedDocs[type]) {
            typedDocs[type] = [];
          }
          typedDocs[type].push(data);
        }
      }
    });

    return Object.keys(typedDocs).map(type => {
      return <StyledSection key={type}>
        <StyledSectionTitle>{type}</StyledSectionTitle>
        <StyledList>
          {typedDocs[type].map(data => {
            return <StyledItem key={data.id} onClick={() => {
              navigate(`/docs/${context.version}/${context.lang}/${data.filename.slice(0, -3)}`);
            }}>
              <Book />
              <span>{data.title}</span>
            </StyledItem>
          })
          }
        </StyledList>
      </StyledSection>

    });

    return;
  };

  return (
    <InfiniteScroll
      useWindow={false}
      pageStart={0}
      loadMore={onloadMore}
      hasMore={hasMoreDocRef.current}
    >
      {getdocList()}
    </InfiniteScroll>
  );
};
export default DocSearchRes;
