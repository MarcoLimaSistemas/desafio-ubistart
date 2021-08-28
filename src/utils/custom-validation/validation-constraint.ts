import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { getManager } from 'typeorm';

@ValidatorConstraint({ async: true })
export class isUniqueValidator implements ValidatorConstraintInterface {
  validate(columnNameValue: any, args: ValidationArguments) {
    const params = args.constraints[0];
    return getManager()
      .query(
        `SELECT * FROM ${params.table} WHERE ${params.column} = '${columnNameValue}'`,
      )
      .then((user) => {
        if (user[0]) return false;
        return true;
      });
  }
}
export function IsUnique(params: any, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [params],
      validator: isUniqueValidator,
    });
  };
}
