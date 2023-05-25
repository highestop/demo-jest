import { stringify } from 'ts-jest';

declare global {
  const SCENARIO: jest.Describe;
  const GIVEN: jest.Describe;
  const WHEN: jest.Describe;
  const AND: jest.Describe;
  const THEN: jest.It;
}

const globalAny: any = global;

globalAny.SCENARIO = (name: string, fn: () => void) =>
  describe(`SCENARIO: ${stringify(name)}`, fn);
globalAny.GIVEN = (name: string, fn: () => void) =>
  describe(`GIVEN: ${stringify(name)}`, fn);
globalAny.WHEN = (name: string, fn: () => void) =>
  describe(`WHEN: ${stringify(name)}`, fn);
globalAny.AND = (name: string, fn: () => void) =>
  describe(`AND: ${stringify(name)}`, fn);
globalAny.THEN = (name: string, fn: () => void) =>
  test(`THEN: ${stringify(name)}`, fn);
