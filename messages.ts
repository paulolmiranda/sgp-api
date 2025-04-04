  import { HttpStatus } from '@nestjs/common';
  import { ExceptionMessages } from '@app/commons';

  export const ExceptionCode = {
    GLOBAL_001: 'GLOBAL_001',
    GLOBAL_002: 'GLOBAL_002',
    GLOBAL_003: 'GLOBAL_003',
    AUTH_001: 'AUTH_001',
    AUTH_002: 'AUTH_002',
    USER_001: 'USER_001',
    USER_002: 'USER_002',
    USER_003: 'USER_003',
    SWIMLANE_001: 'SWIMLANE_001',
    PROJECT_001: 'PROJECT_001',

  };

  export const messages: ExceptionMessages = {
    GLOBAL_001: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message:
        'A aplicação encontrou um erro inesperado. Favor contactar o Administrador. Descrição do erro: :stack.',
    },
    GLOBAL_002: {
      status: HttpStatus.BAD_REQUEST,
      message: 'Identificamos informações inconsistentes.',
    },
    GLOBAL_003: {
      status: HttpStatus.NOT_FOUND,
      message: 'Nenhum registro encontrado.',
    },
    AUTH_001: {
      status: HttpStatus.UNAUTHORIZED,
      message: 'Token inválido.',
    },
    AUTH_002: {
      status: HttpStatus.BAD_REQUEST,
      message: 'Usuário ou senha incorreta. Tente novamente.',
    },
    USER_001: {
      status: HttpStatus.BAD_REQUEST,
      message: 'Código inválido.',
    },
    USER_002: {
      status: HttpStatus.BAD_REQUEST,
      message: 'Usuário não encontrado. Verifique o email e tente novamente.',
    },
    USER_003: {
      status: HttpStatus.BAD_REQUEST,
      message:
        'Este e-mail já está em uso. Por favor, faça login ou recupere sua senha.',
    },
    SWIMLANE_001: {
      status: HttpStatus.FORBIDDEN,
      message: 'Apenas o responsável pelo projeto pode criar uma Swimlane.',
    },
    PROJECT_001: {
      status: HttpStatus.NOT_FOUND,
      message: 'Projeto não encontrado. Verifique o ID informado.',
    },
  };
