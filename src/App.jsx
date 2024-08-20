import { useEffect, useState } from 'react';
import './App.scss';
import parse from 'html-react-parser';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { data } from './data.js';
import Modal from './Modal.jsx';
import Footer from './Footer';
import { Helmet } from 'react-helmet';

// const favorites = ['10_90', '10_129'];
// const initialText = favorites[Math.floor(Math.random() * favorites.length)];

function InitialText() {
  return (
    <div className="modal-content">
      <div className="modal-scrollable-content">
        <p>Гимны Ригведы в переводе Т.Я. Елизаренковой.</p>
        <p>
          Примечательное:
          <li>
            <Link to="10_90">X, 90 О сотворении мира из Пуруши</Link>
          </li>
          <li>
            <Link to="10_129">X, 129. Космогония («Одно»)</Link>
          </li>
          <li>
            <Link to="10_190">X, 190. Космический жар</Link>
          </li>
          <li>
            <Link to="10_121">X, 121. К неизвестному богу (Праджапати)</Link>
          </li>
          <li style={{ marginTop: '5px' }}>
            <Link to="6_64">VI, 64. К Ушас (утренней заре)</Link>
          </li>
          <li>
            <Link to="10_127">X, 127. К Ратри (ночи)</Link>
          </li>
          <li>
            <Link to="10_146">X, 146. К Араньяни (лесу)</Link>
          </li>
          <li>
            <Link to="6_70">VI, 70. К Небу-и-Земле</Link>
          </li>
          <li>
            <Link to="1_90">I, 90. Ко Всем-Богам</Link>
          </li>
          <li>
            <Link to="9_112">IX, 112. О хотениях</Link>
          </li>
          <li>
            <Link to="10_159">X, 159. Самовосхваление женщины</Link>
          </li>
          <li>
            <Link to="10_10">X, 10. Яма и Ями</Link>
          </li>
          <li>
            <Link to="10_18">X, 18. Похоронный гимн</Link>
          </li>
          <li>
            <Link to="10_135">X, 135. Разговор мальчика и умершего отца</Link>
          </li>
        </p>
        <p>
          Текст с благодарностью взят{' '}
          <a href="https://samskrtam.ru/parallel-corpus/rigveda.html">
            отсюда<span className="external-link"></span>
          </a>
          .
        </p>
      </div>
    </div>
  );
}

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [modalContent, setModalContent] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [strict, setStrict] = useState(false);
  const [filteredCount, setFilteredCount] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  function looseIncludes(searchPhrase, targetObject) {
    const sum = targetObject.title + ' ' + targetObject.hymn;
    const regex = new RegExp(
      `(^|[^а-яёa-zA-Z])${searchPhrase.toLowerCase()}`,
      'g'
    );
    return strict
      ? sum.toLowerCase().match(regex)
      : sum.toLowerCase().includes(searchPhrase.toLowerCase());
  }

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

  const applyFilters = () => {
    return data.filter((item) => {
      const matchesContent = looseIncludes(searchText, item);
      return matchesContent;
    });
  };

  useEffect(() => {
    setFilteredCount(applyFilters().length);
  }, [applyFilters]);

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
    const random =
      applyFilters()[Math.floor(Math.random() * applyFilters().length)];
    openModal(e, random);
  };

  const handleClick = (e, obj) => {
    openModal(e, obj);
  };

  const handleArrow = () => {
    setShowFilter((showFilter) => !showFilter);
  };

  return (
    <>
      <div className={`prajapati ${!showFilter ? 'filterHidden' : ''}`}>
        {/* <HeadInHelmet /> */}
        <span
          className={`arrow ${!showFilter ? ' toggle' : ''}`}
          onClick={handleArrow}
        >
          ↑
        </span>
        {showFilter && (
          <div className="filter">
            <div className="inputPlusRandom">
              <div className="inputPlusCheckbox">
                <input
                  onChange={onSearchChange}
                  type="search"
                  value={searchText}
                  placeholder="Поиск по тексту"
                  className="scalable"
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
            <div className="countResults" style={{ fontSize: '0.8rem' }}>
              {filteredCount} результатов найдено
            </div>
          </div>
        )}
        <main className={!showFilter ? 'filterHidden' : ''}>
          <div className="cards">
            {applyFilters().map((obj) => (
              <a
                href={`/${obj.id}`}
                className="card card__title"
                key={obj.id}
                onClick={(e) => handleClick(e, obj)}
              >
                <div className="card__title">
                  <p>{obj.title}</p>
                </div>
              </a>
            ))}
          </div>
          {showModal ? (
            <Modal showModal={showModal} onClose={closeModal}>
              <Helmet>
                <title>{modalContent.title}</title>
                <meta name="description" content="Гимны Ригведы" />
              </Helmet>
              <h2>{modalContent.title}</h2>
              <p>{parse(modalContent.hymn)}</p>
              {modalContent.expl ? (
                <p className="expl">{parse(modalContent.expl)}</p>
              ) : null}
            </Modal>
          ) : (
            <InitialText />
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
