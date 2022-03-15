export function keygen(pref) {
  let count = 0;
  return () => pref + count++;
}
