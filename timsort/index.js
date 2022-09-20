const {ArrayTimSortImpl} = require("./timsort")

exports.TimSort = (array, compared = (a, b) => b - a) => {
  const sortState = {
    workArray: array,
    Compare: compare,
    tempArray: [],
    pendingRunSize: 0,
    pendingRun: [],
    minGallop: 7,
  };
  ArrayTimSortImpl(sortState);

  //返回有序数组
  return sortState.workArray;
};
