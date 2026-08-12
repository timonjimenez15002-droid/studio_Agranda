import React, { useState } from 'react';
import { 
  Newspaper, 
  Search, 
  Clock, 
  User, 
  Tag, 
  X, 
  ArrowRight, 
  BookOpen, 
  ExternalLink 
} from 'lucide-react';
import { NewsArticle } from '../types';
import { INITIAL_NEWS } from '../data/initialData';

export const NewsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const categories = ['all', 'Cosecha', 'Infraestructura', 'Sanidad', 'Mercado', 'Ganadería'];

  const filteredNews = INITIAL_NEWS.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-12 bg-slate-100/80 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
            <Newspaper className="w-3.5 h-3.5 text-amber-700" />
            <span>Actualidad Fitosanitaria & Mercado Agrícola</span>
          </div>
          <h2 className="text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
            Noticias Agropecuarias AGRANDA
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Mantente informado con informes técnicos, políticas de precios, innovaciones en nutrición de suelos y alertas fitosanitarias.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Buscar por título, temática o plaga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat === 'all' ? 'Todas las Noticias' : cat}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredNews.map((article) => (
            <article 
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative aspect-16/9 overflow-hidden bg-slate-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-xs">
                  {article.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-slate-400 text-[11px] mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-bold font-heading text-lg text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500">
                    Fuente: {article.source}
                  </span>

                  <button
                    onClick={() => setActiveArticle(article)}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Leer Artículo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Article Reader Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-h-[88vh] flex flex-col">
              
              <div className="relative aspect-16/9 bg-slate-900">
                <img 
                  src={activeArticle.image} 
                  alt={activeArticle.title}
                  className="w-full h-full object-cover opacity-90" 
                />
                <button
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="px-2.5 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-md uppercase">
                    {activeArticle.category}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold font-heading mt-1 line-clamp-2">
                    {activeArticle.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    <User className="w-3.5 h-3.5 text-amber-600" />
                    {activeArticle.author}
                  </span>
                  <span>{activeArticle.date}</span>
                </div>

                <p className="font-semibold text-slate-900 italic bg-amber-50 p-3 rounded-xl border border-amber-100">
                  "{activeArticle.summary}"
                </p>

                <div className="space-y-3 whitespace-pre-line text-slate-800">
                  {activeArticle.content}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Publicación verificada por {activeArticle.source}</span>
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs"
                  >
                    Cerrar Noticia
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
