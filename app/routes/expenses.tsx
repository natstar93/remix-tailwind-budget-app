// import type { MetaFunction } from '@remix-run/node';
import fakeDb from '~/fakeDb';
import {
  Form,
  NavLink,
  Outlet,
  json,
  redirect,
  useLoaderData,
} from '@remix-run/react';

export const action = async () => {
  const newRecord = fakeDb.addRecord();
  return redirect(`/expenses/${newRecord.id}/add`);
};

export const loader = async () => {
  const records = await fakeDb.getAllRecords();
  return json({ records });
};

export default function Expenses() {
  const { records } = useLoaderData<typeof loader>();
  const expenseTotal = records.reduce(
    (total, record) => (record?.amount || 0) + total,
    0
  );

  return (
    <main className='flex flex-col flex-grow items-start md:w-auto m-6 py-4 bg-white dark:bg-slate-800'>
      <h1>Expenses</h1>
      <div className='w-full flex flex-col md:flex-row gap-4 lg:gap-7'>
        <section className='my-6 gap-4 md:w-8/12'>
          <div>
            <Form method='post' preventScrollReset>
              <button type='submit'>Add a new Expense</button>
            </Form>
          </div>
          <table className='border-spacing-1 md:table-fixed text-xl bg-slate-800 dark:bg-white text-white dark:text-slate-800 rounded-md shadow-md'>
            <thead>
              <tr className='font-bold text-brand-green border-b-solid border-b-2'>
                <th className='text-left'>
                  <span>Expense</span>
                </th>
                <th className='text-right'>
                  <span>Amount (£)</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {records?.map(({ id, name, amount }) => Boolean(id && name && amount) && (
                <tr key={id} className='border-b-solid border-b-2'>
                  <td className='w-6/12'>{name}</td>
                  <td className='w-3/12 text-right'>£{amount}</td>
                  <td className='w-3/12 '>
                    <NavLink
                      to={`/expenses/${id}/edit`}
                      className=''
                      preventScrollReset
                    >
                      Edit
                    </NavLink>
                    {' | '}
                    <NavLink
                      to={`/expenses/${id}/delete`}
                      className=''
                      preventScrollReset
                    >
                      Delete
                    </NavLink>
                  </td>
                </tr>
              ))}

              <tr className='font-bold'>
                <td>Total</td>
                <td className='text-right'>£{expenseTotal}</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className='m-6 lg:w-4/12'>
          <Outlet />
        </section>
      </div>
    </main>
  );
}
