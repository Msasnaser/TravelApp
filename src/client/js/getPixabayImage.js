
export async function fetchPixabayImages(searchTerm) {
  const baseUrl = Client.apiConfig.pixabay.url;
  const apiKey = Client.apiConfig.pixabay.apiKey;
  const requestUrl = `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(searchTerm)}`;

  try {
    const response = await fetch(requestUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const result = await response.json();
    if (result.totalHits > 0) {
      const urls = result.hits.slice(0, 3).map(entry => entry.webformatURL);
      return urls;
    }

    return [];
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}
