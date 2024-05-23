type Expense = {id: number, name: string | null, amount: number | null}

const fakeDb = {
  getRecord: async (id?: string) => {
    return id ? fakeDb.data.find((record) => record.id === Number(id)) : null;
  },

  getAllRecords: async () => {
    return Promise.resolve(fakeDb.data || null);
  },

  addRecord: () => {
    const id = fakeDb.data.length + 1;
    const record = { id, name: null, amount: null };
    fakeDb.data.push(record);
    return record;
  },

  editRecord: ({ id, expenseData }: { id: number, expenseData: {
    [k: string]: FormDataEntryValue;
}}) => {
    const { name, amount } = expenseData;
    const record = fakeDb.data.find((record) => record.id === id);
    const newRecord = { ...record, id, name: name.toString(), amount: Number(amount) };
    fakeDb.data[id - 1] = newRecord;
  },

  data: <Expense[]>[],
};

export default fakeDb;
