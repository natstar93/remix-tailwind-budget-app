import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node';
import { Form, NavLink, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import fakeDb from '~/fakeDb';

export const action = async ({ params }: ActionFunctionArgs) => {
  const { expenseId } = params;

  invariant(expenseId, 'Invalid expenseId');

  fakeDb.deleteRecord({ id: Number(expenseId) });
  return redirect('/expenses');
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { expenseId } = params;
  invariant(expenseId, 'Invalid expenseId');
  const record = await fakeDb.getRecord(expenseId);

  return json({ record });
};

export default function Expense() {
  const { record } = useLoaderData<typeof loader>();

  return (
    <div>
      <h2>{`Delete expense '${record?.name}'`}</h2>
      Are you sure?
      <Form
        method='post'
        id='delete-expense'
        className='flex flex-col py-4 gap-1'
        preventScrollReset
      >
        <button type='submit'>Yes</button>
        <NavLink
          to='/expenses'
          className='rounded-md border-solid border-2 border-brand-green text-brand-green p-2 text-center'
        >
          No
        </NavLink>
      </Form>
      {/* <NavLink to={'/expenses'} className='text-lg' preventScrollReset>
        No
      </NavLink> */}
    </div>
  );
}
