import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import fakeDb from '~/fakeDb';

export const action = async ({ params, request }: ActionFunctionArgs) => {

  console.log({ params, request });
  // fakeDb.editRecord(reques)
  return {};
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
    <article>
      {record?.name}
      {record?.amount}
    </article>
  );
}
