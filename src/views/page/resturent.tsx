import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listRestaurants } from "../../service/restaurants";
import type { Restaurant } from "../../types/types";
import Logo from "../../assets/logo.png";
import apiConfig from "../../service/apiConfig.ts";

const RestaurantPage = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(6);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalElements, setTotalElements] = useState<number>(0);

    const fetchRestaurants = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await listRestaurants({
                page,
                size,
                sort: "name,asc"
            });

            if (response.status === 200 && response.content) {
                setRestaurants(response.content as Restaurant[]);
                setTotalPages(response.totalPages as number);
                setTotalElements(response.totalElements as number);
            } else {
                setError(response.desc || "Failed to fetch restaurants");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, [page, size]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
            setSize(6)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const isRestaurantOpen = (restaurant: Restaurant): boolean => {
        if (!restaurant.openHours) return false;

        const now = new Date();
        const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        //create array and set todayHours to the current da
        const todayHours = restaurant.openHours.find(oh => oh.dayOfWeek === currentDay);

        if (!todayHours || todayHours.closed) return false;

        const [openHour, openMin] = todayHours.openingTime.split(':').map(Number);
        const [closeHour, closeMin] = todayHours.closingTime.split(':').map(Number);

        const openTime = openHour * 60 + openMin;
        const closeTime = closeHour * 60 + closeMin;

        return currentTime >= openTime && currentTime <= closeTime;
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="flex items-center justify-between p-4 lg:px-8 bg-white border-b">
                <div className="flex items-center">
                    <img src={Logo} alt="DineSphere Logo" className="h-20 w-auto" />
                </div>

                <div className="hidden md:flex items-center space-x-8 text-gray-800 font-medium">
                    <a href="#" className="hover:text-black transition">Home</a>
                    <a href="#" className="hover:text-black transition">Restaurants</a>
                    <a href="#" className="hover:text-black transition">Franchise</a>
                    <a href="#" className="hover:text-black transition">Contact</a>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <button className="relative p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                    </button>

                    <button className="p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition">
                        Book a Table
                    </button>
                </div>

                <div className="md:hidden flex flex-row items-center space-x-2">
                    <button className="p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    <button className="relative p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                    </button>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed inset-y-0 right-0 w-64 bg-white shadow-xl transform transition-transform duration-300 z-50 md:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="p-6">
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="absolute top-4 right-4 p-2"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="mt-8 space-y-6 text-lg font-medium text-gray-800">
                        <a href="#" className="block hover:text-black">Home</a>
                        <a href="#" className="block hover:text-black">Restaurants</a>
                        <a href="#" className="block hover:text-black">Franchise</a>
                        <a href="#" className="block hover:text-black">Contact</a>
                    </div>

                    <button className="mt-8 w-full bg-black text-white py-3 rounded-full font-medium">
                        Book a Table
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Header Section */}
            <section className="bg-black text-white py-9">
                <div className="max-w-6xl mx-auto px-5 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold">Restaurants</h1>
                </div>
            </section>

            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                {loading ? (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-xl text-gray-600">Loading restaurants...</div>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-xl text-red-600">Error: {error}</div>
                    </div>
                ) : (
                    <>
                        {/* Restaurant Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {restaurants.map((restaurant) => {
                                const isOpen = isRestaurantOpen(restaurant);
                                return (
                                    <div
                                        key={restaurant.id}
                                        onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                                        className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                                    >
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={restaurant.imageUrl ? `${apiConfig.serverUrl}/${restaurant.imageUrl}` : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600"}
                                                alt={restaurant.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 right-4">
                                                <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                                                    isOpen
                                                        ? "bg-green-500 text-white"
                                                        : "bg-red-500 text-white"
                                                }`}>
                                                    {isOpen ? "Open" : "Closed"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 bg-white">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                                                {restaurant.name}
                                            </h3>
                                            {restaurant.description && (
                                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                    {restaurant.description}
                                                </p>
                                            )}
                                            {restaurant.address && (
                                                <p className="text-gray-500 text-sm mb-2 flex items-start">
                                                    <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {restaurant.address}
                                                </p>
                                            )}
                                            {restaurant.capacity && (
                                                <p className="text-gray-500 text-sm flex items-center">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    Capacity: {restaurant.capacity} guests
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {restaurants.length === 0 && (
                            <div className="text-center text-gray-500 py-16">
                                <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                <p className="text-xl">No restaurants found</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-12">
                                <button
                                    onClick={() => handlePageChange(0)}
                                    disabled={page === 0}
                                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition font-medium"
                                >
                                    First
                                </button>
                                <button
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={page === 0}
                                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition font-medium"
                                >
                                    Previous
                                </button>
                                <span className="px-6 py-2 font-medium text-gray-700">
                                    Page {page + 1} of {totalPages}
                                </span>
                                <button
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page >= totalPages - 1}
                                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition font-medium"
                                >
                                    Next
                                </button>
                                <button
                                    onClick={() => handlePageChange(totalPages - 1)}
                                    disabled={page >= totalPages - 1}
                                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition font-medium"
                                >
                                    Last
                                </button>
                            </div>
                        )}

                        {/* Total Count */}
                        <div className="text-center mt-6 text-gray-600">
                            Showing {restaurants.length} of {totalElements} restaurants
                        </div>
                    </>
                )}
            </section>
        </div>
    );
};

export default RestaurantPage