import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        // Get language from localStorage or default to Arabic
        return localStorage.getItem('app_language') || 'ar';
    });

    useEffect(() => {
        // Save language preference to localStorage
        localStorage.setItem('app_language', language);
        // Set HTML direction based on language
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prevLang => prevLang === 'ar' ? 'en' : 'ar');
    };

    const t = (key) => {
        const translations = {
            ar: {
                // Navigation
                'nav.movies': 'أفلام',
                'nav.tv': 'مسلسلات',
                'nav.anime': 'أنمي',
                'nav.manga': 'مانجا',
                'nav.trending': 'رائجة',
                'nav.adult': 'للكبار (18+)',
                'nav.favorites': 'المفضلة',
                'nav.search': 'بحث',
                'nav.collections': 'سلاسل',
                
                // Movies submenu
                'movies.popular': 'شائعة',
                'movies.topRated': 'الأعلى تقييماً',
                'movies.upcoming': 'قريباً',
                'movies.nowPlaying': 'يعرض الآن',
                
                // TV submenu
                'tv.popular': 'شائعة',
                'tv.topRated': 'الأعلى تقييماً',
                'tv.onAir': 'على الهواء',
                'tv.airingToday': 'تعرض اليوم',
                
                // Home page
                'home.bestMovies': 'أفضل الأفلام',
                'home.trendingToday': 'الأكثر شعبية اليوم',
                'home.nowPlaying': 'يعرض الآن',
                'home.trendingTV': 'مسلسلات رائجة',
                'home.topRated': 'أفضل الأفلام',
                'home.popularMovies': 'أفلام شائعة',
                'home.anime': 'أنمي ومانجا',
                'home.collections': 'سلاسل الأفلام',
                'home.viewMore': 'عرض المزيد',
                'home.viewAllCollections': 'عرض جميع السلاسل',
                
                // Sidebar
                'sidebar.quickLinks': 'روابط سريعة',
                'sidebar.trending': 'رائجة الآن',
                'sidebar.myFavorites': 'مفضلاتي',
                'sidebar.search': 'بحث',
                'sidebar.browseByCategory': 'تصفح حسب الفئة',
                'sidebar.browseMore': 'تصفح المزيد',
                'sidebar.quickFilters': 'فلاتر سريعة',
                'sidebar.highRated': 'تقييم عالي (7+)',
                'sidebar.latestReleases': 'أحدث الإصدارات',
                'sidebar.topRated': 'الأعلى تقييماً',
                
                // Details page
                'details.watchNow': 'شاهد الآن',
                'details.addToFavorites': 'إضافة للمفضلة',
                'details.trailer': 'المعاينة',
                'details.moreInfo': 'معلومات إضافية',
                'details.status': 'الحالة',
                'details.language': 'اللغة',
                'details.budget': 'الميزانية',
                'details.revenue': 'الإيرادات',
                'details.seasons': 'عدد الفصول',
                'details.episodes': 'عدد الحلقات',
                'details.seasonsAndEpisodes': 'الفصول والحلقات',
                'details.similarContent': 'أعمال مشابهة',
                'details.viewAll': 'عرض الكل',
                'details.season': 'فصل',
                'details.seasonsPlural': 'فصول',
                'details.episode': 'حلقة',
                'details.runtime': 'دقيقة',
                'details.loadingError': 'خطأ في تحميل المحتوى',
                'details.notFound': 'المحتوى غير موجود',
                'details.goHome': 'العودة للصفحة الرئيسية',
                
                // Common
                'common.loading': 'جاري التحميل...',
                'common.error': 'خطأ',
                'common.noEpisodes': 'لا توجد حلقات متاحة',
                'common.episode': 'حلقة',
                'common.episodes': 'حلقات',
            },
            en: {
                // Navigation
                'nav.movies': 'Movies',
                'nav.tv': 'TV Series',
                'nav.anime': 'Anime',
                'nav.manga': 'Manga',
                'nav.trending': 'Trending',
                'nav.adult': 'Adult (18+)',
                'nav.favorites': 'Favorites',
                'nav.search': 'Search',
                'nav.collections': 'Collections',
                
                // Movies submenu
                'movies.popular': 'Popular',
                'movies.topRated': 'Top Rated',
                'movies.upcoming': 'Upcoming',
                'movies.nowPlaying': 'Now Playing',
                
                // TV submenu
                'tv.popular': 'Popular',
                'tv.topRated': 'Top Rated',
                'tv.onAir': 'On The Air',
                'tv.airingToday': 'Airing Today',
                
                // Home page
                'home.bestMovies': 'Best Movies',
                'home.trendingToday': 'Trending Today',
                'home.nowPlaying': 'Now Playing',
                'home.trendingTV': 'Trending TV Series',
                'home.topRated': 'Top Rated Movies',
                'home.popularMovies': 'Popular Movies',
                'home.anime': 'Anime & Manga',
                'home.collections': 'Movie Collections',
                'home.viewMore': 'View More',
                'home.viewAllCollections': 'View All Collections',
                
                // Sidebar
                'sidebar.quickLinks': 'Quick Links',
                'sidebar.trending': 'Trending Now',
                'sidebar.myFavorites': 'My Favorites',
                'sidebar.search': 'Search',
                'sidebar.browseByCategory': 'Browse by Category',
                'sidebar.browseMore': 'Browse More',
                'sidebar.quickFilters': 'Quick Filters',
                'sidebar.highRated': 'High Rated (7+)',
                'sidebar.latestReleases': 'Latest Releases',
                'sidebar.topRated': 'Top Rated',
                
                // Details page
                'details.watchNow': 'Watch Now',
                'details.addToFavorites': 'Add to Favorites',
                'details.trailer': 'Trailer',
                'details.moreInfo': 'More Information',
                'details.status': 'Status',
                'details.language': 'Language',
                'details.budget': 'Budget',
                'details.revenue': 'Revenue',
                'details.seasons': 'Seasons',
                'details.episodes': 'Episodes',
                'details.seasonsAndEpisodes': 'Seasons & Episodes',
                'details.similarContent': 'Similar Content',
                'details.viewAll': 'View All',
                'details.season': 'Season',
                'details.seasonsPlural': 'Seasons',
                'details.episode': 'Episode',
                'details.runtime': 'min',
                'details.loadingError': 'Error Loading Content',
                'details.notFound': 'Content not found',
                'details.goHome': 'Go to Home',
                
                // Common
                'common.loading': 'Loading...',
                'common.error': 'Error',
                'common.noEpisodes': 'No episodes available',
                'common.episode': 'Episode',
                'common.episodes': 'Episodes',
            }
        };
        
        return translations[language]?.[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

