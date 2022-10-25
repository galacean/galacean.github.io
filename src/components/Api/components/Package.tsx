import { PkgChild } from '../util/apiUtil';
import Kind from './Kind';

interface IPackage {
  kind: string;
  pgkChildren: PkgChild[];
  setSelectedItem: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function Package(props: IPackage) {
  return (
    <section className='tsd-index-section'>
      <h3>{props.kind}</h3>
      <ul className='tsd-index-list'>
        {props.pgkChildren.map((child) => {
          return (
            <li key={child.id}>
              <Kind {...{ setSelectedItem: props.setSelectedItem, ...child }} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
