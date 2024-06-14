import { UserEntity } from 'src/user/entities/user.entity';
import { UserType } from 'src/user/enum/user-type.enum';

export const userEntityMock: UserEntity = {
  id: 123,
  name: 'Rayssa Isabela Caroline de Paula',
  email: 'rayssa-depaula99@iesa.com.br',
  phone: '9128596843',
  cpf: '45034727048',
  password: 'BjGrHud0BX',
  type_user: UserType.User,
  created_at: new Date(),
  updated_at: new Date(),
};
