import { FULL_NAME_REGEX } from '@utils/constants/regexes';

export const parseActors = (actors: string): string[] =>
  actors
    .split(',')
    .map(name => name.trim())
    .filter(name => FULL_NAME_REGEX.test(name));
