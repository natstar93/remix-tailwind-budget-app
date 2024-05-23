import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import stylesheet from '~/tailwind.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/svg+xml' href='/pound.svg' />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <h1>Budgeting App</h1>
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
        <footer>
          <ul>
            <li>
              <a
                target='_blank'
                href='https://github.com/natstar93'
                rel='noreferrer'
              >
                My Github
              </a>
            </li>
          </ul>
        </footer>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
