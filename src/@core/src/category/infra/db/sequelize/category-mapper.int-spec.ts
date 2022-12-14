import { Category } from "#category/domain";
import { LoadEntityError, UniqueEntityId } from "#seedwork/domain";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";
import { CategorySequelize } from "./category-sequelize";

describe('CategoryModelMapper unit tests', () => {
  setupSequelize({
    models: [CategorySequelize.CategoryModel]
  });
  it('should throws error when category is invalid', () => {
    const model = CategorySequelize.CategoryModel.build({ id: '767d4814-451e-46fe-88e7-511adc91f40e' });

    try {
      CategorySequelize.CategoryModelMapper.toEntity(model);
      fail('The category is valid, but it needs throws a LoadEntityError');
    } catch (e) {
      expect(e).toBeInstanceOf(LoadEntityError);
      expect(e.error).toMatchObject({
        name: ['name should not be empty',
          "name must be a string",
          "name must be shorter than or equal to 255 characters"
        ]
      })
    }
  });

  it('should throw a generic error', () => {
    const error = new Error("Generic Error");
    const spyValidate = jest.spyOn(Category, "validate")
      .mockImplementation(() => {
        throw error;
      });
    const model = CategorySequelize.CategoryModel.build({ id: '767d4814-451e-46fe-88e7-511adc91f40e' });
    expect(() => CategorySequelize.CategoryModelMapper.toEntity(model)).toThrow(error);
    expect(spyValidate).toHaveBeenCalled();
    spyValidate.mockRestore();
  });

  it('should convert a category model to a category entity', () => {
    const created_at = new Date();
    const model = CategorySequelize.CategoryModel.build({
      id: '767d4814-451e-46fe-88e7-511adc91f40e',
      name: "some value",
      description: "some description",
      is_active: true,
      created_at
    });
    const entity = CategorySequelize.CategoryModelMapper.toEntity(model);
    expect(entity.toJSON()).toStrictEqual(
      new Category(
        {
          name: "some value",
          description: "some description",
          is_active: true,
          created_at
        },
        new UniqueEntityId("767d4814-451e-46fe-88e7-511adc91f40e")
      ).toJSON()
    );
  });
});