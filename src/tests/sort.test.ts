import { insertionSort, quickSort, hybridSort, HYBRID_SORT_THRESHOLD } from '../sort';

describe('ソートアルゴリズムのテスト', () => {
  const numberTestCases = [
    {
      name: '空の配列',
      input: [],
      expected: [],
    },
    {
      name: '1要素の配列',
      input: [1],
      expected: [1],
    },
    {
      name: '既にソート済みの配列',
      input: [1, 2, 3, 4, 5],
      expected: [1, 2, 3, 4, 5],
    },
    {
      name: '逆順の配列',
      input: [5, 4, 3, 2, 1],
      expected: [1, 2, 3, 4, 5],
    },
    {
      name: 'ランダムな配列',
      input: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5],
      expected: [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9],
    },
    {
      name: '負の数の配列',
      input: [-3, -1, -4, -1, -5, -9, -2, -6, -5, -3, -5],
      expected: [-9, -6, -5, -5, -5, -4, -3, -3, -2, -1, -1],
    },
    {
      name: '同じ値が連続する配列',
      input: [2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1],
      expected: [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
    },
    {
      name: '少数を含む配列',
      input: [3.5, 1.2, 4.7, 1.3, 5.9, 9.1, 2.6, 6.3, 5.5, 3.1, 5.4],
      expected: [1.2, 1.3, 2.6, 3.1, 3.5, 4.7, 5.4, 5.5, 5.9, 6.3, 9.1],
    },
  ];

  const stringTestCases = [
    {
      name: '空の配列',
      input: [],
      expected: [],
    },
    {
      name: '1要素の文字列配列',
      input: ['apple'],
      expected: ['apple'],
    },
    {
      name: 'アルファベット順の文字列配列',
      input: ['banana', 'apple', 'cherry', 'date'],
      expected: ['apple', 'banana', 'cherry', 'date'],
    },
    {
      name: '日本語の文字列配列',
      input: ['りんご', 'みかん', 'バナナ', 'いちご'],
      expected: ['いちご', 'みかん', 'りんご', 'バナナ'],
    },
    {
      name: '重複を含む文字列配列',
      input: ['apple', 'banana', 'apple', 'cherry', 'banana'],
      expected: ['apple', 'apple', 'banana', 'banana', 'cherry'],
    },
    {
      name: '長さの異なる文字列配列',
      input: ['a', 'aaa', 'aa', 'aaaa', 'a'],
      expected: ['a', 'a', 'aa', 'aaa', 'aaaa'],
    },
    {
      name: '特殊文字を含む配列',
      input: ['test!', '@test', '#test', 'test'],
      expected: ['#test', '@test', 'test', 'test!'],
    },
  ];

  const booleanTestCases = [
    {
      name: '空の配列',
      input: [],
      expected: [],
    },
    {
      name: '1要素のブール値配列',
      input: [true],
      expected: [true],
    },
    {
      name: 'ブール値の混合配列',
      input: [true, false, true, false, false],
      expected: [false, false, false, true, true],
    },
    {
      name: '既にソート済みの配列',
      input: [false, false, false, true, true],
      expected: [false, false, false, true, true],
    },
    {
      name: '逆順の配列',
      input: [true, true, true, false, false],
      expected: [false, false, true, true, true],
    },
    {
      name: '同じ値が連続する配列',
      input: [true, true, true, false, false, false],
      expected: [false, false, false, true, true, true],
    },
  ];

  describe('insertionSort', () => {
    numberTestCases.forEach(({ name, input, expected }) => {
      it(`数値配列: ${name}`, () => {
        expect(insertionSort(input)).toEqual(expected);
      });
    });

    stringTestCases.forEach(({ name, input, expected }) => {
      it(`文字列配列: ${name}`, () => {
        expect(insertionSort(input)).toEqual(expected);
      });
    });

    booleanTestCases.forEach(({ name, input, expected }) => {
      it(`ブール値配列: ${name}`, () => {
        expect(insertionSort(input)).toEqual(expected);
      });
    });
  });

  describe('quickSort', () => {
    numberTestCases.forEach(({ name, input, expected }) => {
      it(`数値配列: ${name}`, () => {
        expect(quickSort(input)).toEqual(expected);
      });
    });

    stringTestCases.forEach(({ name, input, expected }) => {
      it(`文字列配列: ${name}`, () => {
        expect(quickSort(input)).toEqual(expected);
      });
    });

    booleanTestCases.forEach(({ name, input, expected }) => {
      it(`ブール値配列: ${name}`, () => {
        expect(quickSort(input)).toEqual(expected);
      });
    });
  });

  describe('hybridSort', () => {
    numberTestCases.forEach(({ name, input, expected }) => {
      it(`数値配列: ${name}`, () => {
        expect(hybridSort(input)).toEqual(expected);
      });
    });

    stringTestCases.forEach(({ name, input, expected }) => {
      it(`文字列配列: ${name}`, () => {
        expect(hybridSort(input)).toEqual(expected);
      });
    });

    booleanTestCases.forEach(({ name, input, expected }) => {
      it(`ブール値配列: ${name}`, () => {
        expect(hybridSort(input)).toEqual(expected);
      });
    });

    describe('閾値のテスト', () => {
      // テストの前にモジュールをモック化
      beforeEach(() => {
        jest.spyOn(require('../sort'), 'insertionSort');
        jest.spyOn(require('../sort'), 'quickSort');
      });

      // テストの後にモックをリセット
      afterEach(() => {
        jest.clearAllMocks();
      });

      it(`${HYBRID_SORT_THRESHOLD}要素以下の配列は挿入ソートを使用`, () => {
        const input = Array.from({ length: HYBRID_SORT_THRESHOLD }, (_, i) => i);
        const expected = [...input];

        expect(hybridSort(input)).toEqual(expected);
        expect(insertionSort).toHaveBeenCalled();
        expect(quickSort).not.toHaveBeenCalled();
      });

      it(`${HYBRID_SORT_THRESHOLD + 1}要素以上の配列はクイックソートを使用`, () => {
        const input = Array.from({ length: HYBRID_SORT_THRESHOLD + 1 }, (_, i) => i);
        const expected = [...input];

        expect(hybridSort(input)).toEqual(expected);
        expect(insertionSort).not.toHaveBeenCalled();
        expect(quickSort).toHaveBeenCalled();
      });
    });
  });
});
