const store = {
  storeKey: 'basket',
  storage: window.localStorage,

  getItems() {
    return JSON.parse(this.storage.getItem(this.storeKey)) || {
      amountGoods: 0,
      sumGoods: 0,
      goods: {}
    };
  },

  setItems(items) {
    this.storage.setItem(this.storeKey,
      JSON.stringify(items)
    );
  },

  setItem(key, value) {
    const repository = this.getItems();

    this.storage.setItem(
      this.storeKey,
      JSON.stringify(
        Object.assign(
          {},
          repository,
          {
            [key]: value
          }
        )
      )
    );
  },

  removeItem(key) {
    const repository = this.getItems();

    delete repository[key];

    this.storage.setItem(
      this.storeKey,
      JSON.stringify(repository)
    );
  }
};

export { store };
