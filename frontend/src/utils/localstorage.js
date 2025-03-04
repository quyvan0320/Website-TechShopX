export const addToFavoritesLocalStorage = (product) => {
  const favorites = getFavoritesLocalStorage();
  if (!favorites.some((p) => p._id === product._id)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

export const removeFavoriteLocalStorage = (productId) => {
  const favorites = getFavoritesLocalStorage();
  const updateFavorites = favorites.filter(
    (product) => product._id !== productId
  );
  localStorage.setItem('favorites', JSON.stringify(updateFavorites))
};

export const getFavoritesLocalStorage = () => {
  const favoritesJSON = localStorage.getItem("favorites");
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};

export const clearFavoritesLocalStorage = () => {
  localStorage.removeItem("favorites"); 
};
