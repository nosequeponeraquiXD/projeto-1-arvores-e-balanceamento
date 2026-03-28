export function nearestNeighbor(matrix: number[][]): number {
  const n = matrix.length;
  const visited = new Array(n).fill(false);

  let current = 0;
  visited[current] = true;
  et cost = 0;

  for (let i = 0; i < n - 1; i++) {
    let next = -1;
    let min = Infinity;

    for (let j = 0; j < n; j++) {
      if (!visited[j] && matrix[current][j] < min) {
        min = matrix[current][j];
        next = j;
      }
    }

 
}
