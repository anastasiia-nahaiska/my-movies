export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,58}\.[a-zA-Z]{2,}$/u;
export const NO_SPACES_REGEX = /^\S+$/;
export const PASSWORD_MIN_MAX_REGEX = /^.{8,32}$/;
export const NAME_REGEX = /^(?:[A-Za-z]+(?: [A-Za-z]+)*){3,48}$/;
export const FOUR_DIGITS_NUMBER = /^\d{4}$/;
export const FULL_NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ'-]+(?: [A-Za-zÀ-ÖØ-öø-ÿ'-]+)*$/;