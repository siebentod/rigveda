import '../App.scss';

export const metadata = {
  title: 'Ригведа | Все гимны Ригведы',
  description: 'Все гимны Ригведы с возможностью поиска',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
