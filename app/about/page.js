import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

function About() {
  return (
    <>
      {/* <HeadInHelmet /> */}
      <div className="about">
        <div className="about__icons">
          <Link href="/">
            <FaHome />
          </Link>
          {/* <a href="https://github.com/siebentod/rigveda">
            <FaGithub />
          </a> */}
        </div>
        <div className="about__main">
          <p>
            Текст с благодарностью взят{' '}
            <a href="https://samskrtam.ru/parallel-corpus/rigveda.html">
              отсюда<span className="external-link"></span>
            </a>{' '}
            и переделан в формат{' '}
            <a href="https://github.com/siebentod/rigveda/blob/main/src/data.js">
              js-объекта<span className="external-link"></span>
            </a>
            . По карибским законам последний может быть переделан во что угодно
            еще.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
