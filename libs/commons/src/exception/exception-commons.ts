import { validate as classValidate, ValidatorOptions } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export const validate = async (
  object: object,
  validatorOptions?: ValidatorOptions,
): Promise<void> => {
  const errors = await classValidate(object, validatorOptions);

  if (errors.length !== 0) {
    throw new BadRequestException(errors);
  }
};
