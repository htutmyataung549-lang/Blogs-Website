import * as migration_20260401_093700_init from './20260401_093700_init';

export const migrations = [
  {
    up: migration_20260401_093700_init.up,
    down: migration_20260401_093700_init.down,
    name: '20260401_093700_init'
  },
];
