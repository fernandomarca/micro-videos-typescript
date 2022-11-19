import CategoryRepository from "category/domain/repository/CategoryRepository";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output.dto";
import { Usecase } from "../../../@seedwork/application/use-case";

export class UpdateCategoryUseCase implements Usecase<Input, Output> {
  constructor(private categoryRepo: CategoryRepository.Repository) { }

  async execute(input: Input): Promise<Output> {
    const entity = await this.categoryRepo.findById(input.id);
    entity.update(input.name, input.description);

    if (input.is_active === true) {
      entity.activate();
    }

    if (input.is_active === false) {
      entity.deactivate();
    }

    await this.categoryRepo.update(entity);
    return CategoryOutputMapper.toOutput(entity);
  }
}

export type Input = {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
}

type Output = CategoryOutput;