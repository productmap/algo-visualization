export function bubbleSort(arr, direction) {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (
        (direction === "asc" && arr[i] > arr[i + 1]) ||
        (direction === "desc" && arr[i] < arr[i + 1])
      ) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
  return arr;
}
