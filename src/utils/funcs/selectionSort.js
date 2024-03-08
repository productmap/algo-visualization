export function selectionSort(arr, direction) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (
        (direction === "asc" && arr[minIndex] > arr[j]) ||
        (direction === "desc" && arr[minIndex] < arr[j])
      ) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
  return arr;
}
