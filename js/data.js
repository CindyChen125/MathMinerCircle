import {validateDataset} from './search.js';
export async function loadDigits() {
  // Resolve from the module so GitHub Pages repository subpaths remain supported.
  const [dataResponse, manifestResponse] = await Promise.all([
    fetch(new URL('../assets/pi-million.txt', import.meta.url)),
    fetch(new URL('../assets/pi-manifest.json', import.meta.url))
  ]);
  if (!dataResponse.ok || !manifestResponse.ok) throw new Error('Download failed.');
  return validateDataset(await dataResponse.text(), await manifestResponse.json());
}
