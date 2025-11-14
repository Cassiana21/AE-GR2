import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchProducts } from '../api/product.routes';
import LoadingSpinner from '../components/LoadingSpinner';

export default function FavoritesPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const favoriteIds = useSelector((state) => state.favorites.items || []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { data } = await fetchProducts();

        if (data && Array.isArray(data)) {
          const favSet = new Set(favoriteIds.map((id) => Number(id)));
          const onlyFavorites = data.filter((p) => favSet.has(Number(p.id)));
          setProducts(onlyFavorites);
        } else {
          setError('Nu s-au putut încărca produsele.');
        }
      } catch (err) {
        setError(err.message || 'A apărut o eroare la încărcarea produselor.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [favoriteIds]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-100 px-4">
        <div className="text-center bg-white rounded-2xl shadow-xl px-8 py-8 border border-pink-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Nu ai produse favorite</h2>
          <p className="text-sm text-gray-500">
            Apasă pe <span className="text-pink-500">❤️</span> la orice produs ca să îl adaugi aici.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-rose-100">
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-pink-600 tracking-tight">
              Favoritele tale ❤️
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Toate produsele pe care ți-au plăcut cel mai mult.
            </p>
          </div>
        </div>

        {/* Grid produse */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl shadow-lg border border-pink-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Imagine */}
              <div className="relative h-64 bg-gray-100 overflow-hidden">
                <img
                  src={product.image || 'https://via.placeholder.com/400'}
                  alt={product.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Badge categorie */}
                <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm text-pink-600 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                  {product.category || 'Categorie'}
                </span>

                {/* Inimioară statică (doar design) */}
                <span className="absolute top-4 right-4 text-pink-500 text-2xl drop-shadow-lg">
                  ❤️
                </span>
              </div>

              {/* Info produs */}
              <div className="px-5 py-5">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                  {product.name}
                </h3>

                <div className="mt-4 flex justify-between items-center">
                  <p className="text-xl font-semibold text-pink-600">
                    {product.price} lei
                  </p>
                  <p className="text-xs text-gray-500">
                    Stoc: {product.stock ?? 0}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
