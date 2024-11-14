import '../App.scss';
import App from './components/App';

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}
