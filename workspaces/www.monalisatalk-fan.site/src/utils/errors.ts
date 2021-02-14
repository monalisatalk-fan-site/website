export class BaseError extends Error {
  // @ts-expect-error
  constructor(...args) {
    super(...args);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends BaseError {}
