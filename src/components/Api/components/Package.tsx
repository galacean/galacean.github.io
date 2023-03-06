import { styled } from "@oasis-engine/editor-design-system";
import { PkgChild } from '../util/apiUtil';
import Kind from './Kind';

interface IPackage {
  kind: string;
  pgkChildren: PkgChild[];
  setSelectedItem: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const StyledSectionPackage = styled("div", {
  padding: 0,
  "& h3": {
    padding: "$2 $4"
  }
});

const StyledPackage = styled("ul", {
  padding: 0,
  columnCount: 4,
  columnGap: "20px",
  listStyle: "none",
  '@media (max-width: 768px)': {
    columnCount: 1
  }
});

export default function Package(props: IPackage) {
  return (
    <StyledSectionPackage>
      <h3>{props.kind}</h3>
      <StyledPackage>
        {props.pgkChildren.map((child) => {
          return (
            <li key={child.id}>
              <Kind setSelectedItem={props.setSelectedItem} {...child} />
            </li>
          );
        })}
      </StyledPackage>
    </StyledSectionPackage>
  );
}
