import invariant from "tiny-invariant";

type Expense = { id: number; name: string | null; amount: number | null };

const fakeDb = {
  getRecord: async (id?: string) => {
    return id ? fakeDb.data.find((record) => record.id === Number(id)) : null;
  },

  getAllRecords: async () => {
    return Promise.resolve(fakeDb.data || null);
  },

  addRecord: () => {
    const id = Math.floor(Math.random() * 1000000)  ;
    const record = { id, name: null, amount: null };
    fakeDb.data.push(record);
    return record;
  },

  editRecord: ({
    id,
    expenseData,
  }: {
    id: number;
    expenseData: {
      [k: string]: FormDataEntryValue;
    };
  }) => {
    const { name, amount } = expenseData;
    invariant(name, 'Expense Name cannot be empty');
    invariant(Number(amount), 'A value must be supplied');
    const record = fakeDb.data.find((record) => record.id === id);
    invariant(record, 'Record not found');

    const newRecord = {
      ...record,
      id,
      name: name.toString(),
      amount: Number(amount),
    };
    const index = fakeDb.data.findIndex((entry) => id === entry.id);
    invariant(index, 'Record not found');

    fakeDb.data[index] = newRecord;
  },

  deleteRecord: ({ id }: { id: number }) => {
    const position = fakeDb.data.findIndex((expense) => expense.id == id);
    fakeDb.data.splice(position, 1);
  },

  data: <Expense[]>[],
};

export default fakeDb;
