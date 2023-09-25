import passport, { type Strategy } from 'passport'

type TypeStrategy<T, U, X> = new (params: U, callback: X) => T

export function PassportUse<T extends Strategy, U, X>(
  name: string,
  Strategy: TypeStrategy<T, U, X>,
  params: U,
  callback: X
): void {
  passport.use(name, new Strategy(params, callback))
}
