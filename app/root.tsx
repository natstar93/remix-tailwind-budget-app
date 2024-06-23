import React from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  redirect,
} from '@remix-run/react';
import type { LinksFunction, MetaFunction } from '@remix-run/node';

import Header from './header';
import Footer from './footer';
import fakeDb from '~/fakeDb';
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
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  return (
    <html lang='en' className={isDarkMode ? 'dark' : 'light'}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/svg+xml' href='/pound.svg' />
        <Meta />
        <Links />
      </head>
      <body className='divide-y divide-solid'>
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
