export default class Base {
  id: string;
  createdAt: Date;

  constructor(data: Base) {
    this.id = data.id;
    this.createdAt = data.createdAt;
  }
}
