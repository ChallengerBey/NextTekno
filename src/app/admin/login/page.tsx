"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/app/context/AdminContext";
import { Lock, User, Eye, EyeOff } from "lucide-react";

const AdminLoginPage = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { login } = useAdmin();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simulate loading
        setTimeout(() => {
            if (login(password)) {
                router.push("/admin");
            } else {
                setError("Hatalı şifre!");
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-black/10"></div>
            
            {/* Login Card */}
            <div className="relative w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4">
                            <User size={32} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">NextTekno</h1>
                        <p className="text-gray-600">Admin Panel Girişi</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Admin Şifresi
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={20} className="text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Şifrenizi girin"
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            {error && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">!</span>
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Giriş yapılıyor...
                                </>
                            ) : (
                                <>
                                    <Lock size={20} />
                                    Admin Paneline Giriş
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            © 2024 NextTekno. Tüm hakları saklıdır.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
