import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { authotizationToLoginPayload } from 'src/utils/base-64-converter';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { autorization } = ctx.switchToHttp().getRequest().headers;

  const loginPayload = authotizationToLoginPayload(autorization);

  return loginPayload?.id;
});
