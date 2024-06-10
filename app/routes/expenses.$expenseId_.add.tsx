import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node';
import { Form, NavLink, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import fakeDb from '~/fakeDb';

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const { expenseId } = params;
 
  invariant(expenseId, 'Invalid expenseId');

  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  fakeDb.editRecord({ id: Number(expenseId), expenseData });
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
      <h2>Add Expense</h2>
      <Form
        key={record?.id}
        method='post'
        id='edit-expense'
        className='flex flex-col py-4 gap-1'
        preventScrollReset
      >
        <label htmlFor='name'>Expense Name</label>
        <input
          defaultValue={record?.name || ''}
          className='mb-4'
          name='name'
          id='name'
          type='text'
        />
        <label htmlFor='amount'>Amount (£)</label>
        <input
          defaultValue={record?.amount || 0}
          className='mb-4'
          name='amount'
          type='text'
        />
        <div className='flex flex-row py-4 gap-1'>
          <button type='submit' className='w-1/2'>
            Save
          </button>
          <NavLink
            to='/expenses'
            className='w-1/2 rounded-md border-solid border-2 border-brand-green text-brand-green p-2 text-center'
          >
            Cancel
          </NavLink>
        </div>
      </Form>
    </div>
  );
}
