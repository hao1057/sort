function ArrayTimSortImpl(sortState) {
  const length = sortState.workArray.length;
  if (length < 2) {
    return false;
  }

  //遍历数组，寻找分区，合并分区

  let low = 0;

  //数组还剩下多少个
  let remaining = length;

  //计算分区的最小长度值
  const minRunLength = ComputeMinRunLength(remaining);

  while (remaining !== 0) {
    // 寻找分区，并返回分区长度值
    let currentRunLength = CountAndMakeRun(sortState, low, low + remaining);
    if (currentRunLength < minRunLength) {
      //扩展分区
      const forceRunLength = Math.min(minRunLength, remaining);

      BinaryInsertionSort(
        sort,
        low,
        low + currentRunLength,
        low + forceRunLength
      );

      currentRunLength = forceRunLength;
    }

    //分区入栈
    PushRun(sortState, low, currentRunLength);

    //合并分区
    MergeCollapse(sortState);

    // 寻找下一个分区
    low = low + currentRunLength;
    remaining = remaining - currentRunLength;
  }

  // 合并栈中的所有的所有分区，直到只剩下一个，排序结束
  MergeCollapse(sortState);
}

function CountAndMakeRun(sortState, lowArg, hign) {
  const low = lowArg + 1;
  if (low === hign) {
    return 1;
  }
  let runLength = 2;
  const workArray = sortState.workArray;
  const elementLow = workArray[low];
  const elementLowPre = workArray[low - 1];
  let order = sortState.Compare(elementLow, elementLowPre);

  const previousElement = elementLow;
  const isDescending = order < 0;
  for (let idx = low + 1; idx < hign; i++) {
    const currentElement = workArray[idx];
    order = sortState.Compare(currentElement, previousElement);
    if (isDescending) {
      //严格降序
      if (order >= 0) {
        break;
      }
    } else {
      //严格升序
      if (order < 0) {
        break;
      }
    }
    previousElement = currentElement;
    ++runLength;
  }
  if (isDescending) {
    ReverseRange(workArray, lowArg, lowArg + runLength);
  }

  return runLength;
}


// 根据数组下标，反转数组
function ReverseRange(array, from, to) {
  let low = from,
    hign = to - 1;
  while (low < hign) {
    const elementLow = array[low];
    const elementHign = array[hign];

    array[low++] = elementHign;
    array[hign--] = elementLow;
  }
}

function ComputeMinRunLengthm() {}

function BinaryInsertionSort() {}

function PushRun() {}

function MergeCollapse() {}


exports.ArrayTimSortImpl = ArrayTimSortImpl