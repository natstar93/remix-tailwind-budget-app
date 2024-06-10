// import type { MetaFunction } from '@remix-run/node';
import { redirect } from "@remix-run/node";

export const loader = async () => {
  return redirect('/expenses');
};