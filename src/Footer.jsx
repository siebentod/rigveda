import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <Link to="/about">About</Link> |{' '}
      <a href="https://github.com/siebentod/rigveda">
        Github<span className="external-link"></span>
      </a>
    </footer>
  );
}

export default Footer;
