import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { fetchProducts, deleteProduct } from '../api/product.routes';
import LoadingSpinner from '../components/LoadingSpinner';
import { toggleFavorite, setFavorites } from '../store/slices/favoritesSlice';
import { getFavorites, addFavorite, removeFavorite } from '../api/favorite.routes';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');

  const user = useSelector((state) => state.user.user);
  const isAdmin = user?.role === 'admin';
  const favorites = useSelector((state) => state.favorites.items || []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isFavorite = (productId) => favorites.includes(productId);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { data } = await fetchProducts();
        if (Array.isArray(data)) setProducts(data);
        else setError('Failed to load products');

        if (user) {
          const favResponse = await getFavorites();
          if (favResponse?.success && Array.isArray(favResponse.data)) {
            dispatch(setFavorites(favResponse.data));
          }
        } else dispatch(setFavorites([]));
      } catch (err) {
        setError(err.message || 'An error occurred while fetching products');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [user, dispatch]);

  const handleFavoriteClick = async (productId) => {
    if (!user) {
      toast.error('Trebuie să fii autentificat pentru a salva la favorite');
      navigate('/login');
      return;
    }
    try {
      if (isFavorite(productId)) {
        const res = await removeFavorite(productId);
        if (res?.success) {
          dispatch(toggleFavorite(productId));
          toast.success('Produs eliminat din favorite');
        }
      } else {
        const res = await addFavorite(productId);
        if (res?.success) {
          dispatch(toggleFavorite(productId));
          toast.success('Produs adăugat la favorite');
        }
      }
    } catch {
      toast.error('Eroare la actualizarea favorite-lor');
    }
  };

  const handleEditClick = (id) => navigate(`/products/edit/${id}`);
  const handleCreateClick = () => navigate('/products/create');
  const handleDeleteClick = async (id) => {
    if (!confirm('Sigur vrei să ștergi acest produs?')) return;
    try {
      setDeletingId(id);
      const res = await deleteProduct(id);
      if (res?.success) {
        setProducts(products.filter((p) => p.id !== id));
        toast.success('Produs șters');
      }
    } finally {
      setDeletingId(null);
    }
  };

  const categories = ['All', 'Tricouri', 'Hoodies', 'Pantaloni', 'Rochii', 'Geci'];
  const filteredProducts = products
    .filter((p) => selectedCategory === 'All' || p.category === selectedCategory)
    .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

  // --- Loading state ---
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  // --- Error state ---
  if (error) {
    return (
      <div className="flex items-center justify-center py-20 bg-white">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  // --- Empty state ---
  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white">
        <p className="text-gray-500 font-semibold">Nu există produse</p>
        {isAdmin && (
          <button
            onClick={handleCreateClick}
            className="mt-4 rounded-lg bg-rose-600 px-4 py-2 text-sm text-white hover:bg-rose-500"
          >
            Adaugă primul produs
          </button>
        )}
      </div>
    );
  }

  // --- Main page ---
  return (
    <div className="bg-gradient-to-br from-rose-50 via-white to-pink-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900">Colecție de haine</h1>
            <p className="text-slate-600 mt-1 text-sm">
              Descoperă cele mai noi articole din colecția noastră fashion.
            </p>
          </div>

          {/* FILTER & SORT */}
          <div className="flex gap-3 flex-wrap items-center">
            <select
              className="px-3 py-1 rounded-md border border-gray-300"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              className="px-3 py-1 rounded-md border border-gray-300"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Preț crescător</option>
              <option value="desc">Preț descrescător</option>
            </select>
            {isAdmin && (
              <button
                onClick={handleCreateClick}
                className="rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-rose-500"
              >
                + Adaugă produs
              </button>
            )}
          </div>
        </div>

        {/* GRID PRODUSE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-md border border-pink-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden bg-pink-50">
                <img
                  src={product.image || 'https://via.placeholder.com/300'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* INIMIOARA */}
                <button
                  onClick={() => handleFavoriteClick(product.id)}
                  className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur shadow-lg w-10 h-10 flex items-center justify-center hover:bg-white transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={isFavorite(product.id) ? '#e11d48' : 'none'}
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="#e11d48"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.936 0-3.622 1.248-4.312 3.001C11.31 4.998 9.624 3.75 7.688 3.75 5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </button>

                {/* ADMIN ACTIONS */}
                {isAdmin && (
                  <div className="absolute bottom-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => handleEditClick(product.id)}
                      className="px-3 py-1 text-sm bg-white rounded-md shadow hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product.id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-md shadow hover:bg-red-400"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* INFO */}
              <div className="p-5">
                <h3 className="font-semibold text-lg text-slate-900 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-500 mt-1">{product.category}</p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-rose-600 font-bold text-lg">{product.price} lei</p>
                  <p className="text-xs text-slate-500">Stoc: {product.stock ?? 0} buc</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
