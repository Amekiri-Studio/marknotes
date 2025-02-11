
/******************************************************************************
                              Enums
******************************************************************************/

export enum NodeEnvs {
  Dev = 'development',
  Test = 'test',
  Production = 'production'
}

export enum Status {
  Normal = 0,
  Banned = 1,
  Removed = -1
}

export enum Permission {
  NoRight = 0,
  Basic = 1,
  Note = 2,
  Tag = 4,
  User = 8
}

export enum Publicness {
  PRIVATE = 0,
  PUBLIC = 1
}