import {
  getNumberFormatter,
  getDateFormatter,
  getTimeFormatter,
  getMessageFormatter,
} from '../../src/client/includes/formatters'
import { init } from '../../src/client/configs'

beforeEach(() => {
  init({ fallbackLocale: undefined })
})

describe('number formatter', () => {
  const number = 123123
  test('should format a date according to the current locale', () => {
    init({ fallbackLocale: 'en' })
    expect(getNumberFormatter().format(number)).toBe('123,123')
  })

  test('should format a number according to a locale', () => {
    init({ fallbackLocale: 'en' })
    expect(getNumberFormatter({ locale: 'pt-BR' }).format(number)).toBe(
      '123.123'
    )
  })

  test('should format a number with a custom format', () => {
    init({
      fallbackLocale: 'en',
      formats: require('../fixtures/formats.json'),
    })

    expect(getNumberFormatter({ format: 'brl' }).format(number)).toBe(
      'R$123,123.00'
    )
  })

  test('should format a number with inline options', () => {
    init({ fallbackLocale: 'en' })

    expect(
      getNumberFormatter({ style: 'currency', currency: 'BRL' }).format(number)
    ).toBe('R$123,123.00')
  })
})

describe('date formatter', () => {
  const date = new Date(2019, 1, 1)

  test('should format a date according to the current locale', () => {
    init({ fallbackLocale: 'en' })
    expect(getDateFormatter().format(date)).toBe('2/1/19')
  })

  test('should format a date according to a locale', () => {
    expect(getDateFormatter({ locale: 'pt-BR' }).format(date)).toBe('01/02/19')
  })

  test('should throw if passed a non-existing format', () => {
    init({
      fallbackLocale: 'en',
      formats: require('../fixtures/formats.json'),
    })

    expect(() =>
      getDateFormatter({ locale: 'pt-BR', format: 'foo' }).format(date)
    ).toThrowError(`[svelte-i18n] Unknown "foo" date format.`)
  })

  test('should format a date with a custom format', () => {
    init({
      fallbackLocale: 'en',
      formats: require('../fixtures/formats.json'),
    })

    expect(getDateFormatter({ format: 'customDate' }).format(date)).toBe(
      '2019 AD'
    )
  })

  test('should format a date with inline options', () => {
    init({ fallbackLocale: 'en' })

    expect(
      getDateFormatter({ year: 'numeric', era: 'short' }).format(date)
    ).toBe('2019 AD')
  })
})

describe('time formatter', () => {
  const time = new Date(2019, 1, 1, 20, 37, 32)

  test('should format a time according to the current locale', () => {
    init({ fallbackLocale: 'en' })
    expect(getTimeFormatter().format(time)).toBe('8:37 PM')
  })

  test('should format a time according to a locale', () => {
    expect(getTimeFormatter({ locale: 'pt-BR' }).format(time)).toBe('20:37')
  })

  test('should format a time with a custom format', () => {
    init({
      fallbackLocale: 'en',
      formats: require('../fixtures/formats.json'),
    })

    expect(getTimeFormatter({ format: 'customTime' }).format(time)).toBe(
      '08:37:32 PM'
    )
  })

  test('should throw if passed a non-existing format', () => {
    init({
      fallbackLocale: 'en',
      formats: require('../fixtures/formats.json'),
    })

    expect(() =>
      getTimeFormatter({ locale: 'pt-BR', format: 'foo' }).format(time)
    ).toThrowError(`[svelte-i18n] Unknown "foo" time format.`)
  })

  test('should format a time with inline options', () => {
    init({ fallbackLocale: 'en' })

    expect(
      getTimeFormatter({
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(time)
    ).toBe('08:37:32 PM')
  })
})

describe('message formatter', () => {
  test('formats a message with interpolated values', () => {
    expect(
      getMessageFormatter('Page: {current,number}/{max,number}', 'en').format({
        current: 2,
        max: 10,
      })
    ).toBe('Page: 2/10')
  })

  test('formats number with custom formats', () => {
    expect(
      getMessageFormatter('Number: {n, number, compactShort}', 'en').format({
        n: 2000000,
      })
    ).toBe('Number: 2M')
  })
})
