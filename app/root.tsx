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
          <h1><span>Budgeting App</span></h1>
        </header>
        <main className='flex flex-col items-center w-full md:w-auto py-4 bg-white dark:bg-slate-800'>
          {children}
        </main>
        <footer className='min-h-screen'>
          <ul>
            <li>
              <a
                target='_blank'
                href='https://github.com/natstar93'
                rel='noreferrer'
              >
                <span>My Github</span>
              </a>
            </li>
          </ul>
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
