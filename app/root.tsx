import fakeDb from '~/fakeDb';

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  redirect,
} from '@remix-run/react';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import stylesheet from '~/tailwind.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export const meta: MetaFunction = () => {
  return [
    { title: 'Budgeting App' },
    { name: 'description', content: 'Monthly expense budgeting' },
  ];
};

export const action = async () => {
  const newRecord = fakeDb.addRecord();
  return redirect(`/expenses/${newRecord.id}/edit`);
};

export default function App() {
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
          <span>Budgeting App</span>
        </header>
        <Outlet />
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
