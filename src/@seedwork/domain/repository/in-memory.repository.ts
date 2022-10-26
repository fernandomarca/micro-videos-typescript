import { Entity } from "../entity/entity";
import { NotFoundError } from "../errors/not-found.error";
import { UniqueEntityId } from "../value-objects/unique-entity-id.vo";
import { RepositoryInterface } from "./repository-contracts";

export abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E> {
  private items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }
  async findById(id: string | UniqueEntityId): Promise<E> {
    const _id = `${id}`
    return this._get(_id);
  }
  async findAll(): Promise<E[]> {
    return this.items;
  }
  async update(entity: E): Promise<void> {
    await this._get(entity.id);
    const index = this.items.findIndex(i => i.id === entity.id);
    this.items[index] = entity;
  }
  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`
    await this._get(_id);
    const index = this.items.findIndex(i => i.id === _id);
    this.items.splice(index, 1);
  }

  protected async _get(id: string): Promise<E> {
    const entity = this.items.find(item => item.id === id);
    if (!entity) {
      throw new NotFoundError(`Entity Not Found using ID ${id}`);
    }
    return entity;
  }
}