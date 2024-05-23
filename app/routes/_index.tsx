import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node';
import fakeDb from '~/fakeDb';
import { Form, json, useLoaderData } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Budgeting App' },
    { name: 'description', content: 'Monthly expense budgeting' },
  ];
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  console.log({ params, request });
};

export const loader = async () => {
  const records = await fakeDb.getAllRecords();

  return json({ records });
};

export default function Index() {
  const { records } = useLoaderData<typeof loader>();

  return (
    <main className='flex flex-col items-center w-full md:w-auto bg-white dark:bg-slate-800 h-dvh '>
      <p className="p-6 max-w-xl mx-auto space-x-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel mi a magna laoreet posuere id in mi. Donec eu tincidunt est. Duis commodo placerat lacinia. Vestibulum at metus sed sapien semper hendrerit nec at quam. Fusce ipsum ligula, tincidunt non neque. </p>
      <Form>
        <table className='border-spacing-1 md:table-fixed text-2xl bg-slate-800 dark:bg-white text-white dark:text-slate-800 rounded-xl shadow-md'>
        <thead >
          <tr >
            <th className="md:min-w-72 text-left">Expense</th>
            <th className="md:min-w-42 text-left">Amount (£)</th>
          </tr>
        </thead>
        <tbody>
          {records?.map(({ id, name, value }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>

      </table>Form goes here
      </Form>
    </main>
  );
}
