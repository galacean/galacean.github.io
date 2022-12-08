import { InfoEmpty } from "iconoir-react";
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { styled } from "@oasis-engine/editor-design-system";
import { Flex } from '@oasis-engine/editor-components';
import { MatchedDocs } from '../headerUtils';

interface IDocSearchResProps {
  setLoadingSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
  filter: (data: any) => boolean;
  search: () => Promise<any>;
  category?: string;
  categoryReg?: RegExp;
  link: (data: any) => string;
  icon: any;
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
  const [searchData, setSearchData] = useState<MatchedDocs[]>([]);

  const search = async () => {
    props.setLoadingSearchResult(true);

    return props.search().then(({ list }) => {
      setSearchData((prev) => {
        return prev ? [...prev, ...list] : [...list];
      });
    }).finally(() => {
      props.setLoadingSearchResult(false);
    })
  };

  useEffect(() => {
    search();
  }, [])

  const docList = searchData?.filter((data) => props.filter(data));

  if (!docList || docList.length === 0) {
    return <StyledNoResult align="both" gap="sm">
      <InfoEmpty />
      <span>{formatMessage({ id: 'app.header.search.no-matching' })}</span>
    </StyledNoResult>;
  }

  const typedDocs: Record<string, any> = {};

  docList.forEach((data: any) => {
    let category = props.category;

    // TODO:  && !data.content 兼容老搜索接口
    if (category && !data.content) {
      const type = data[category];

      if (!typedDocs[type]) {
        typedDocs[type] = [];
      }

      typedDocs[type].push(data);
    } else {
      const reg = props.categoryReg;

      if (reg) {
        const res = reg.exec(data.content);

        if (res && res[1]) {
          category = res[1].trim();

          if (!typedDocs[category]) {
            typedDocs[category] = [];
          }

          typedDocs[category].push(data);
        }
      }
    }
  });

  return (
    <>
      {Object.keys(typedDocs).map(type => {
        return <StyledSection key={type}>
          <StyledSectionTitle>{type}</StyledSectionTitle>
          <StyledList>
            {typedDocs[type].map((data: any) => {
              return <StyledItem key={data.id} onClick={() => {
                navigate(props.link(data));
              }}>
                {props.icon}
                <span>{data.title || data.name}</span>
              </StyledItem>
            })
            }
          </StyledList>
        </StyledSection>
      })}
    </>
  )
};

export default DocSearchRes;
