import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

function HeadInHelmet() {
  return (
    <>
      <Helmet>
        <title>Ригведа</title>
        <meta name="description" content="Гимны Ригведы" />
      </Helmet>
      <header>
        <div className="links">
          <div className="link link__github">
            <a href="https://github.com/siebentod/rigveda">
              Github<span className="external-link"></span>
            </a>
          </div>
          <div className="link link__about">
            <Link to="/">Home</Link>
          </div>
        </div>
      </header>
    </>
  );
}

export default HeadInHelmet;
