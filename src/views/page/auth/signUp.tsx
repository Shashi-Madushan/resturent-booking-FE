import SignUpImage from "../../../assets/signUp.png";

function SignUp() {
    return (
        <div className="min-h-screen flex">


            {/* Right Side - Sign Up Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 lg:p-8">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center lg:text-left">
                        Get Started Now
                    </h2>

                    <form className="space-y-5">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black sm:text-sm"
                                placeholder="Enter your name"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black sm:text-sm"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black sm:text-sm"
                                placeholder="••••••"
                            />
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-center">
                            <input
                                id="terms"
                                type="checkbox"
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                I agree to the{" "}
                                <a href="#" className="text-blue-600 hover:text-blue-800">
                                    terms & policy
                                </a>
                            </label>
                        </div>

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-4 text-sm text-gray-500 bg-white">or</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <img
                                src="https://www.google.com/favicon.ico"
                                alt="Google"
                                className="h-5 w-5 mr-2"
                            />
                            Sign in with Google
                        </button>
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="black">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.67 15.65c.47.3 1 .55 1.67.55.67 0 1.2-.25 1.67-.55v-1.82h-3.34v1.82zm-1.33-3.18v1.18h4.66v-1.18c0-1.5-1.5-2.5-3.33-2.5s-3.33 1-3.33 2.5zm6.66-1.82v-1.18c0-1.5-1.5-2.5-3.33-2.5s-3.33 1-3.33 2.5v1.18h6.66z" />
                            </svg>
                            Sign in with Apple
                        </button>
                    </div>

                    {/* Sign In Link */}
                    <p className="mt-8 text-center text-sm text-gray-600">
                        Have an account?{" "}
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-800">
                            Sign In
                        </a>
                    </p>
                </div>
            </div>

            <div className="hidden lg:block lg:w-4/6 relative rounded-l-lg">
                <img
                    src={SignUpImage}
                    alt="Sign Up background"
                    className="absolute inset-0 h-full w-full object-cover rounded-l-3xl"
                />
            </div>
        </div>
    );
}

export default SignUp;