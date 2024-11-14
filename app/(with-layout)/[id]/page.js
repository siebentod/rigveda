import { data } from '../lib/data.js';
import Display from '../components/Display.jsx';

export async function generateStaticParams() {
  // Статическая генерация для книг с id '1' и '2'
  return data;
}

export async function generateMetadata({ params }) {
  const id = (await params).id;
  const item = data.find((obj) => obj.id === id);
  return {
    title: `${item.title} | Ригведа`,
    description: 'Все гимны Ригведы с возможностью поиска',
  };
}

export default async function BookPage({ params }) {
  const id = (await params).id;

  return <Display id={id} />;
}
