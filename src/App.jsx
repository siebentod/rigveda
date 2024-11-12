import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  FaGithub,
  FaInfo,
  FaArrowUp,
  FaAlignJustify,
  FaBars,
} from 'react-icons/fa';
import parse from 'html-react-parser';
import { Helmet } from 'react-helmet';

import './App.scss';
import { data } from './data.js';
import Modal from './Modal.jsx';
import HomeText from './HomeText.jsx';
// import NotFound from './NotFound.jsx';

// const favorites = ['10_90', '10_129'];
// const initialText = favorites[Math.floor(Math.random() * favorites.length)];

function App() {
  // const [isDarkMode, setIsDarkMode] = useState(() => {
  //   return localStorage.getItem('theme') === 'dark';
  // });
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [showCards, setShowCards] = useState(true);
  const [modalContent, setModalContent] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [strict, setStrict] = useState(false);
  const [filteredCount, setFilteredCount] = useState(0);
  const [filteredArr, setFilteredArr] = useState(data);
  const navigate = useNavigate();
  const { id } = useParams();

  // const toggleTheme = () => {
  //   setIsDarkMode((prevMode) => !prevMode);
  // };

  // useEffect(() => {
  //   localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  // }, [isDarkMode]);

  const looseIncludes = useCallback(
    function looseIncludes(searchPhrase, targetObject) {
      const sum = targetObject.title + ' ' + targetObject.hymn;
      const regex = new RegExp(
        `(^|[^а-яёa-zA-Z])${searchPhrase.toLowerCase()}`,
        'g'
      );
      return strict
        ? sum.toLowerCase().match(regex)
        : sum.toLowerCase().includes(searchPhrase.toLowerCase());
    },
    [strict]
  );

  useEffect(() => {
    if (id) {
      const item = data.find((obj) => obj.id === id);
      if (item) {
        setModalContent(item);
        setShowModal(true);
      }
    } else {
      setShowModal(false);
    }
  }, [id]);

  // useEffect(() => {
  //   // Сброс скролла на верх при изменении текста
  //   if (textContainerRef.current) {
  //   }
  // }, [selectedText]);

  // useEffect(() => {
  //   if (showModal) {
  //     document.body.classList.add('modal-open');
  //   } else {
  //     document.body.classList.remove('modal-open');
  //   }
  // }, [showModal]);

  useEffect(() => {
    setFilteredArr(data.filter((item) => looseIncludes(searchText, item)));
  }, [looseIncludes, searchText, strict]);

  useEffect(() => {
    setFilteredCount(filteredArr.length);
  }, [filteredArr]);

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const openModal = (e, obj) => {
    e.preventDefault();
    setModalContent(obj);
    setShowModal(true);
    navigate(`/${obj.id}`);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/');
  };

  const handleRandom = (e) => {
    const random = filteredArr[Math.floor(Math.random() * filteredArr.length)];
    openModal(e, random);
  };

  const handleClick = (e, obj) => {
    openModal(e, obj);
  };

  const handleArrow = () => {
    setShowFilter((showFilter) => !showFilter);
  };

  const handleLeftArrow = () => {
    setShowCards((showCards) => !showCards);
  };

  return (
    <>
      <Helmet>
        <title>Ригведа | Все гимны Ригведы</title>
        <meta
          name="description"
          content="Все гимны Ригведы с возможностью поиска"
        />
      </Helmet>
      <div className={`prajapati ${!showFilter ? 'filterHidden' : ''}`}>
        {/* <HeadInHelmet /> */}
        <div className="filter">
          {showFilter && (
            <div className="icons scalable-icons">
              <Link to="/about">
                <FaInfo />
              </Link>
              <a href="https://github.com/siebentod/rigveda">
                <FaGithub />
              </a>
              {/* <FaAdjust onClick={toggleTheme} /> */}
            </div>
          )}
          <div className="filter__buttons">
            <div
              // className={`arrow-left ${!showCards ? ' toggle' : ''} ${
              className={`arrow-left ${!showFilter ? ' move' : ''}`}
              onClick={handleLeftArrow}
            >
              <FaBars />
            </div>
            <div
              className={`arrow-up ${!showFilter ? ' toggle' : ''}`}
              onClick={handleArrow}
            >
              <FaArrowUp />
            </div>
            {showFilter && (
              <div className="inputPlusRandom">
                <div className="inputPlusCheckbox scalable">
                  <input
                    onChange={onSearchChange}
                    type="search"
                    value={searchText}
                    placeholder="Поиск по тексту"
                  />
                  <input
                    type="checkbox"
                    title="Strict"
                    onChange={() => setStrict(!strict)}
                  />
                </div>
                <button className="openRandom scalable" onClick={handleRandom}>
                  Open Random
                </button>
              </div>
            )}
          </div>
          {showFilter && searchText && (
            <div className="countResults" style={{ fontSize: '0.8rem' }}>
              {filteredCount} результатов найдено
            </div>
          )}
        </div>
        <main className={!showFilter ? 'filterHidden' : ''}>
          <div className={`cards ${!showCards ? 'cardsHidden' : ''}`}>
            {filteredArr.map((obj) => (
              <a
                href={`/${obj.id}`}
                className="card card__title"
                key={obj.id}
                onClick={(e) => handleClick(e, obj)}
              >
                <p>{obj.title}</p>
              </a>
            ))}
          </div>
          {showModal ? (
            <Modal showModal={showModal} onClose={closeModal}>
              <Helmet>
                <title>{modalContent.title}</title>
                <meta
                  name="description"
                  content="Все гимны Ригведы с возможностью поиска"
                />
              </Helmet>
              <h2>{modalContent.title}</h2>
              <p>{parse(modalContent.hymn)}</p>
              {modalContent.expl ? (
                <p className="expl">{parse(modalContent.expl)}</p>
              ) : null}
            </Modal>
          ) : (
            <HomeText />
          )}
        </main>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default App;
