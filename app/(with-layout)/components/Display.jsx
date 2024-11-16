import Link from 'next/link';
import parse from 'html-react-parser';

import { data } from '../lib/data';
import { redirect } from 'next/navigation';

function Display({ id }) {
  const item = data.find((obj) => obj.id === id);

  if (!item) {
    redirect('/');
  }

  return (
    <>
      <div className="modal-content">
        <Link className="modal-close" href="/">
          &times;
        </Link>
        <div className="modal-scrollable-content">
          <h2>{item.title}</h2>
          <p>{parse(item.hymn)}</p>
        </div>
      </div>
    </>
  );
}

export default Display;
