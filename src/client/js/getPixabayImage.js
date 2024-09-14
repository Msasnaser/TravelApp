export async function PixabayImage(query) {
  const url = `${Client.apiConfig.pixabay.url}?key=${
    Client.apiConfig.pixabay.apiKey
  }&q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.totalHits > 0) {
      const imageUrls = data.hits.slice(0, 3).map((hit) => hit.webformatURL);

      return imageUrls;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}
