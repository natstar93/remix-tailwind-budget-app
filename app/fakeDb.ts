const fakeDb = {

  getRecord: async (id?: string) => {
    return id ? fakeDb.data.find(record => record.id === Number(id)) : null;
  },

  getAllRecords: async () => {

    return Promise.resolve(fakeDb.data || null);
  },

  data: [{ id: 1, name: 'food', value: 200 }, { id: 2, name: 'rent', value: 800 }],
};

export default fakeDb;
