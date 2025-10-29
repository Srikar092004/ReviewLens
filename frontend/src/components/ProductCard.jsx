import { Link } from 'react-router-dom';

function ProductCard({ product, reviewCount, avgRating }) {
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Laptop': return '💻';
      case 'Mobile': return '📱';
      case 'Chair': return '🪑';
      default: return '📦';
    }
  };

  const getCategoryGradient = (category) => {
    switch(category) {
      case 'Laptop': return 'from-blue-400 to-blue-600';
      case 'Mobile': return 'from-green-400 to-green-600';
      case 'Chair': return 'from-purple-400 to-purple-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getCategoryBadge = (category) => {
    switch(category) {
      case 'Laptop': return 'bg-blue-100 text-blue-800';
      case 'Mobile': return 'bg-green-100 text-green-800';
      case 'Chair': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
      {/* Product Image Area */}
      <div className={`relative bg-gradient-to-br ${getCategoryGradient(product.category)} p-12 flex items-center justify-center h-56`}>
        <span className="text-9xl transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-2xl">
          {getCategoryIcon(product.category)}
        </span>
        <span className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-xs font-bold ${getCategoryBadge(product.category)} shadow-md`}>
          {product.category}
        </span>
        {reviewCount > 0 && (
          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-md flex items-center space-x-1">
            <span className="text-yellow-500 text-sm">⭐</span>
            <span className="font-bold text-gray-900 text-sm">{avgRating}</span>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm font-semibold text-gray-500 mb-3">{product.brand}</p>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <div>
            <div className="text-3xl font-bold text-blue-600">
              ${product.price}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 mb-1">
              <span className="text-yellow-500">⭐</span>
              <span className="font-bold text-gray-900">
                {avgRating > 0 ? avgRating : 'New'}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
            </div>
          </div>
        </div>
        
        <Link
          to={`/products/${product.id}`}
          className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          View Details & Reviews →
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
