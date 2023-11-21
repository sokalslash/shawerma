const store = {
  storeKey: 'basket',
  storage: window.localStorage,

  getItems() {
    return JSON.parse(this.storage.getItem(this.storeKey)) || {};
  },

  setItems(items) {
    this.storage.setItem(this.storeKey,
      JSON.stringify(items)
    );
  },

  setItem(key, value) {
    const store = this.getItems();

    this.storage.setItem(
      this.storeKey,
      JSON.stringify(
        Object.assign(
          {},
          store,
          {
            [key]: value
          }
        )
      )
    );
  },

  removeItem(key) {
    const store = this.getItems();

    delete store[key];

    this.storage.setItem(
      this.storeKey,
      JSON.stringify(store)
    );
  }
}

export { store };