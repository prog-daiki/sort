/**
 * 比較可能な型を表すインターフェース
 */
interface Comparable {
  valueOf(): number | string | boolean;
}

export const HYBRID_SORT_THRESHOLD = 10;

/**
 * デフォルトの比較関数
 * @param left 比較する左側の値
 * @param right 比較する右側の値
 * @returns leftが小さい場合は負数、等しい場合は0、大きい場合は正数を返す
 */
const defaultCompare = <T extends Comparable>(left: T, right: T): number => {
  const value1 = left.valueOf();
  const value2 = right.valueOf();

  if (value1 < value2) return -1;
  if (value1 > value2) return 1;
  return 0;
};

/**
 * 挿入ソートを実行する関数
 * 配列の要素を順番に取り出し、既にソートされた部分の適切な位置に挿入していく
 * @param arrayToSort ソートする配列
 * @param compareFunction 要素の大小を比較する関数（オプション）
 * @returns ソートされた新しい配列
 */
export const insertionSort = <T extends Comparable>(
  arrayToSort: T[],
  compareFunction: (left: T, right: T) => number = defaultCompare
): T[] => {
  const sortedArray = [...arrayToSort];

  for (let unsortedIndex = 1; unsortedIndex < sortedArray.length; unsortedIndex++) {
    const elementToInsert = sortedArray[unsortedIndex];
    let sortedIndex = unsortedIndex - 1;

    while (sortedIndex >= 0 && compareFunction(sortedArray[sortedIndex], elementToInsert) > 0) {
      sortedArray[sortedIndex + 1] = sortedArray[sortedIndex];
      sortedIndex--;
    }
    sortedArray[sortedIndex + 1] = elementToInsert;
  }
  return sortedArray;
};

/**
 * クイックソートを実行する関数
 * ピボットを選択し、配列を分割して再帰的にソートを行う
 * @param arrayToSort ソートする配列
 * @param compareFunction 要素の大小を比較する関数（オプション）
 * @returns ソートされた新しい配列
 */
export const quickSort = <T extends Comparable>(
  arrayToSort: T[],
  compareFunction: (left: T, right: T) => number = defaultCompare
): T[] => {
  // 空配列の場合はそのまま返す
  if (arrayToSort.length <= 1) {
    return [...arrayToSort];
  }

  // ピボットを配列の中央の要素に設定
  const pivotIndex = Math.floor(arrayToSort.length / 2);
  const pivotElement = arrayToSort[pivotIndex];

  // ピボットより小さい要素、等しい要素、大きい要素に分割
  const smallerElements: T[] = [];
  const equalElements: T[] = [];
  const largerElements: T[] = [];

  // 各要素をピボットと比較して適切な配列に振り分け
  for (const element of arrayToSort) {
    const comparisonResult = compareFunction(element, pivotElement);

    if (comparisonResult < 0) {
      smallerElements.push(element);
    } else if (comparisonResult > 0) {
      largerElements.push(element);
    } else {
      equalElements.push(element);
    }
  }

  // 再帰的にソートして結果を結合
  return [
    ...quickSort(smallerElements, compareFunction),
    ...equalElements,
    ...quickSort(largerElements, compareFunction),
  ];
};

/**
 * ハイブリッドソート
 * 小規模データ（10要素以下）の場合は挿入ソート、
 * それ以外はクイックソートを使用
 * @param arr 配列
 * @returns ソートした配列
 */
export const hybridSort = <T extends Comparable>(arr: T[]): T[] => {
  if (arr.length <= HYBRID_SORT_THRESHOLD) {
    return insertionSort(arr);
  }
  return quickSort(arr);
};
