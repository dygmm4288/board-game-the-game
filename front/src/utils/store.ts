class Store {
  storage!: Storage;
  constructor() {
    this.storage = window.localStorage;
  }
  save(key: string, value: unknown) {
    if (typeof value !== "string") value = JSON.stringify(value);
    this.storage.setItem(key, value as string);
  }
  load(key: string) {
    const value = this.storage.getItem(key);
    if (!value) return null;
    return JSON.parse(value);
  }
}
export default new Store();
