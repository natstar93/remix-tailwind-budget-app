import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import fakeDb from '~/fakeDb';

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const { expenseId } = params;
  invariant(expenseId, 'Invalid expenseId');

  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  fakeDb.editRecord({ id: Number(expenseId), expenseData });
  return redirect('/');
};
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { expenseId } = params;
  invariant(expenseId, 'Invalid expenseId');
  const record = await fakeDb.getRecord(expenseId);

  return { record };
};

export default function Expense() {
  const { record } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Expense Details</h1>
      <Form
        method='post'
        id='edit-expense'
        className='flex flex-col py-4 gap-1'
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

        <button type='submit' className=''>
          Save Expense
        </button>
      </Form>
    </div>
  );
}
