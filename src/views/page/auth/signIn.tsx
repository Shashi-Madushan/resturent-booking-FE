import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginImage from "../../../assets/signIn.png";
import { signinUser } from "../../../service/auth";
import type { SigninRequest } from "../../../types/types";

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<SigninRequest>({
        email: "",
        password: "",
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        // Clear error when user starts typing
        if (error) setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation
        if (!formData.email.trim()) {
            setError("Please enter your email");
            return;
        }
        if (!formData.password.trim()) {
            setError("Please enter your password");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await signinUser(formData);
            
            if (response.success) {
                // Navigate to home page on successful login
                navigate("/");
            } else {
                setError(response.desc || "Sign in failed. Please check your credentials.");
            }
        } catch (err) {
            setError("Network error. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex">
            {/* Left Side - Full Screen Image */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <img
                    src={LoginImage}
                    alt="Login background"
                    className="absolute inset-0 h-full w-full object-cover rounded-l-3xl"
                />
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
                    <p className="text-gray-600 mb-8">Enter your Credentials to access your account</p>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black sm:text-sm"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black sm:text-sm"
                                placeholder="Enter your password"
                                required
                            />
                            <div className="text-right mt-2">
                                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                Remember for 30 days
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-4 rounded-lg font-medium transition ${
                                loading 
                                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                                    : 'bg-black text-white hover:bg-gray-800'
                            }`}
                        >
                            {loading ? 'Signing In...' : 'Login'}
                        </button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5 mr-2" />
                                Sign in with Google
                            </button>
                            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <path fill="#000" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.67 15.65c.47.3 1 .55 1.67.55.67 0 1.2-.25 1.67-.55v-1.82h-3.34v1.82zm-1.33-3.18v1.18h4.66v-1.18c0-1.5-1.5-2.5-3.33-2.5s-3.33 1-3.33 2.5zm6.66-1.82v-1.18c0-1.5-1.5-2.5-3.33-2.5s-3.33 1-3.33 2.5v1.18h6.66z" />
                                </svg>
                                Sign in with Apple
                            </button>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-800">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;