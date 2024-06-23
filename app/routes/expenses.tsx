// import type { MetaFunction } from '@remix-run/node';
import fakeDb from "~/fakeDb";
import {
  Form,
  NavLink,
  Outlet,
  isRouteErrorResponse,
  json,
  redirect,
  useLoaderData,
  useNavigate,
  useRouteError,
} from "@remix-run/react";

export const action = async () => {
  const newRecord = fakeDb.addRecord();
  return redirect(`/expenses/${newRecord.id}/add`);
};

export const loader = async () => {
  const records = await fakeDb.getAllRecords();

  // if (Math.random() < 0.1)
  //   throw new Error('Sorry, the expense records could not be loaded');
  return json({ records });
};

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  let errorMessage = "Unknown Error";

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <main className='flex flex-col flex-grow items-start md:w-auto m-6 py-4 bg-white dark:bg-slate-800'>
      <h1>Error</h1>
      <p>{errorMessage}</p>
      <button onClick={() => navigate(`/expenses`)}>Retry</button>
    </main>
  );
}

export default function Expenses() {
  const { records } = useLoaderData<typeof loader>();
  const expenseTotal = records?.reduce(
    (total, record) => (record?.amount || 0) + total,
    0,
  );

  return (
    <main className='flex flex-col flex-grow items-start md:w-auto px-6 py-10 bg-slate-100 dark:bg-slate-800'>
      <h1>Expenses</h1>
      <div className='w-full flex flex-col md:flex-row gap-4 lg:gap-7'>
        <section className='my-6 gap-4 md:w-8/12'>
          <table className='md:table-fixed text-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-brand-light rounded-md shadow-md dark:shadow-none'>
            <thead className='px-2'>
              <tr className='font-bold text-slate-600 dark:text-slate-300 border-b border-b-slate-400'>
                <th className='text-left'>
                  <span>Expense</span>
                </th>
                <th className='text-left' colSpan={2}>
                  <span>Amount (£)</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {records?.map(
                ({ id, name, amount }) =>
                  Boolean(id && name && amount) && (
                    <tr key={id} className='border-b border-b-slate-400 '>
                      <td className='w-6/12 text-brand-dark dark:text-brand-light'>
                        {name}
                      </td>
                      <td className='w-3/12 text-brand-darker dark:text-brand-lighter'>
                        £{amount}
                      </td>
                      <td className='w-3/12 text-sm text-brand-lighter'>
                        <NavLink
                          to={`/expenses/${id}/edit`}
                          className=''
                          preventScrollReset
                        >
                          Edit
                        </NavLink>
                        {" | "}
                        <NavLink
                          to={`/expenses/${id}/delete`}
                          className=''
                          preventScrollReset
                        >
                          Delete
                        </NavLink>
                      </td>
                    </tr>
                  ),
              )}

              <tr className='font-bold text-slate-600 dark:text-slate-300'>
                <td>Total</td>
                <td>£{expenseTotal}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <Form method='post' preventScrollReset>
              <button type='submit'>Add a new Expense</button>
            </Form>
          </div>
        </section>
        <section className='m-6 lg:w-4/12'>
          <Outlet />
        </section>
      </div>
    </main>
  );
}
