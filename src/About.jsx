import { Link } from 'react-router-dom';

function About() {
  return (
    <>
      {/* <HeadInHelmet /> */}
      <div className="about">
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
      <footer>
        <Link to="/">Home</Link> |{' '}
        <a href="https://github.com/siebentod/">
          Github<span className="external-link"></span>
        </a>
      </footer>
    </>
  );
}

export default About;
