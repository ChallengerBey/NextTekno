"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/app/context/AdminContext";

const AdminLoginPage = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { login } = useAdmin();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(password)) {
            router.push("/admin");
        } else {
            setError("Hatalı şifre!");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-boxdark">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-default dark:bg-boxdark sm:p-12">
                <h2 className="mb-6 text-center text-2xl font-bold text-black dark:text-white">
                    Admin Girişi
                </h2>

                <form onSubmit={handleLogin}>
                    <div className="mb-6">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Şifre
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Şifrenizi girin"
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                    </div>

                    <button className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90">
                        Giriş Yap
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;
