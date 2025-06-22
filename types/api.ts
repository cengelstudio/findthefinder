import type { user } from '@prisma/client';

export type ApiResponse<T = {}> = {
  status?:
    | 'added'
    | 'code'
    | 'email'
    | 'password'
    | 'system'
    | 'ok'
    | 'error'
    | 'not_found'
    | 'unauthorized'
    | 'updated'
    | 'deleted';
  message?: string;
  token?: string;
  auth?: boolean;
} & T;

export type SignUpRequest = Pick<user, 'email' | 'phone'> & {
  code: string;
  codeDescription: string;
  password: string;
  rePassword: string;
  secondMail?: string;
};

export type LoginRequest = Pick<user, 'email' | 'password'>;

export type UpdateRequest = Partial<Pick<user, 'email' | 'phone'>> & {
  get: string;
  newCode?: string;
  newCodeDesc?: string;
  password?: string;
  rePassword?: string;
  secondMail?: string;
};

export type DeleteRequest = {
  get: string;
};

export type SessionRequest = {
  get: string;
};

export type LabelControlRequest = {
  get: string;
};

export type SendMessageRequest = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type ForgotPasswordRequest = {
  email: string;
  lang: SupportedLang;
};

export type SessionData = {
  number: string | null;
  email: string | null;
  secondMail: string | null;
  codes: {
    id: number;
    content: string | null;
    used_on: string | null;
  }[];
};

export type FoundRequest = {
  code: string;
  email: string;
  phone: string;
  address: string;
  lang: SupportedLang;
};

export type SupportedLang =
  | 'tr'
  | 'en'
  | 'ru'
  | 'de'
  | 'fr'
  | 'it'
  | 'es'
  | 'gr';
