import { Validator } from '../src'

/**
 * Dummy test
 */
describe('Dummy test', () => {
  const foo = 'foo'
  const isFoo = (val: string) => val === foo
  const notFooErrMsg = 'not foo'

  const bar = 'bar'
  const isBar = (val: string) => val === bar
  const notBarErrMsg = 'not bar'

  const isTypeofString = (val: any) => typeof val === 'string'

  it('DummyClass is instantiable', () => {
    expect(new Validator()).toBeInstanceOf(Validator)
  })

  it('single validate', () => {
    const validator = new Validator()
    validator.add(isFoo, notFooErrMsg)
    expect(validator.run(foo)).toBeNull()
    expect(validator.run(bar)).toBe(notFooErrMsg)
  })

  it('multiple validate', () => {
    const validator = new Validator()
    validator
      .add(isFoo, notFooErrMsg)
      .add(isBar, notBarErrMsg)

    expect(validator.run(bar)).toBe(notFooErrMsg)
    expect(validator.run(foo)).toBe(notBarErrMsg)
  })

  it('compose validate', () => {
    const validator = new Validator()
    validator.add([isTypeofString, isFoo], 'not typeof string and value of foo')
    expect(validator.run(1)).toBe('not typeof string and value of foo')
    expect(validator.run('foo')).toBeNull()
  })
})
