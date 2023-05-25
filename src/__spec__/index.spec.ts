let mockedPromiseFn: jest.Mock;

jest.mock('../promise', () => ({
  promise: () => mockedPromiseFn(),
}));

import { main, get, reset } from '../main';

GIVEN('return Promise.resolve', () => {
  beforeEach(() => {
    mockedPromiseFn = jest.fn().mockImplementation(() => Promise.resolve(1));
    expect(get()).toBe(0);
  });
  afterEach(() => {
    mockedPromiseFn.mockReset();
    reset();
  });
  WHEN('use real timer', () => {
    beforeEach(() => {
      main();
    });
    THEN('result should be 1', () => {
      expect(get()).toBe(1);
    });
  });
  WHEN('use fake timer', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      main();
    });
    afterEach(() => {
      jest.useRealTimers();
    });
    THEN('result should be 1 (Promise.resolve is not a microtask)', () => {
      expect(get()).toBe(1);
    });
  });
});

GIVEN('return Promise which is resovled by a microtask', () => {
  beforeEach(() => {
    mockedPromiseFn = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        queueMicrotask(() => resolve(1));
      });
    });
    expect(get()).toBe(0);
  });
  afterEach(() => {
    mockedPromiseFn.mockReset();
    reset();
  });
  WHEN('use real timer', () => {
    beforeEach(() => {
      main();
    });
    THEN('result should be 1 (microtasks are run after call stack)', () => {
      expect(get()).toBe(1);
    });
  });
  WHEN('use fake timer', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      main();
    });
    afterEach(() => {
      jest.useRealTimers();
    });
    THEN('result should be 0 (microtasks are not run)', () => {
      expect(get()).toBe(0);
    });
    AND('run ticks', () => {
      beforeEach(() => {
        jest.runAllTicks();
      });
      THEN('result should be 1 (microtasks are run)', () => {
        expect(get()).toBe(1);
      });
    });
  });
});

GIVEN('return Promise which is resovled by a macrotask', () => {
  beforeEach(() => {
    mockedPromiseFn = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(1));
      });
    });
    expect(get()).toBe(0);
  });
  afterEach(() => {
    mockedPromiseFn.mockReset();
    reset();
  });
  WHEN('use real timer', () => {
    beforeEach(() => {
      main();
    });
    THEN('result should be 0 (macrotasks are not run)', () => {
      expect(get()).toBe(0);
    });
  });
  WHEN('use fake timer', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      main();
    });
    afterEach(() => {
      jest.useRealTimers();
    });
    THEN('result should be 0 (macrotasks are not run)', () => {
      expect(get()).toBe(0);
    });
    AND('run ticks', () => {
      beforeEach(() => {
        jest.runAllTicks();
      });
      THEN(
        'result should be 0 (macrotasks are run, only microtasks are run)',
        () => {
          expect(get()).toBe(0);
        }
      );
    });
    AND('run timers', () => {
      beforeEach(() => {
        jest.runAllTimers();
      });
      THEN('result should be 1 (macrotasks are run)', () => {
        expect(get()).toBe(1);
      });
    });
  });
});
