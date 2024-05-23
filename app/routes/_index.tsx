import type { MetaFunction } from '@remix-run/node';
import fakeDb from '~/fakeDb';
import { Form, NavLink, json, redirect, useLoaderData } from '@remix-run/react';

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

export const loader = async () => {
  const records = await fakeDb.getAllRecords();
  return json({ records });
};

export default function Index() {
  const { records } = useLoaderData<typeof loader>();
  const expenseTotal = records.reduce(
    (total, record) => (record?.amount || 0) + total,
    0
  );

  return (
    <div className='flex flex-row'>
      <section>
        <table className='border-spacing-1 md:table-fixed text-2xl bg-slate-800 dark:bg-white text-white dark:text-slate-800 rounded-xl shadow-md'>
          <thead>
            <tr className='font-bold text-brand-green'>
              <th className='md:min-w-72 text-left'>
                <span>Expense</span>
              </th>
              <th className='md:min-w-42 text-left'>
                <span>Amount (£)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {records?.map(({ id, name, amount }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>£{amount}</td>
                <td>
                  <NavLink to={`/expenses/${id}/edit`}>Edit expense</NavLink>
                </td>
              </tr>
            ))}

            <tr className='font-bold border-t-solid border-t-2 '>
              <td className='py-4'>Total</td>
              <td className='py-4'>£{expenseTotal}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <p className='p-6 max-w-xl mx-auto space-x-4'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel
          mi a magna laoreet posuere id in mi. Donec eu tincidunt est. Duis
          commodo placerat lacinia.
        </p>
        <Form method='post'>
          <button type='submit'>Add a new Expense</button>
        </Form>
      </section>
    </div>
  );
}
