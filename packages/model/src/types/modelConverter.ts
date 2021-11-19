import { plainToClass, ClassConstructor } from "class-transformer";

export function Convertor<T, U>(
  clsModel: ClassConstructor<T>,
  clsConvert: ClassConstructor<U>
): ClassDecorator {
  return function (constructor: Function) {
    constructor.prototype.toModel = function () {
      return plainToClass(clsModel, this);
    };

    constructor.prototype.fromModel = function (plain: Partial<T>) {
      Object.assign(this, plainToClass(clsConvert, plain));
    };
  };
}

export abstract class ModelConverter {
  public toModel(): any {}
  public fromModel(plain: Partial<ClassConstructor<unknown>>): void {}
}
