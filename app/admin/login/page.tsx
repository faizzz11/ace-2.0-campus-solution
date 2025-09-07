"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminLoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate login process
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Dummy authentication - redirect to admin dashboard
        if (email && password) {
            localStorage.setItem('isAdminLoggedIn', 'true')
            localStorage.setItem('currentAdmin', JSON.stringify({
                id: 1,
                name: 'Dr. Admin Smith',
                email: email,
                role: 'administrator'
            }))
            window.location.href = '/admin/faculty'
        }
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <Link
                href="/"
                className="absolute top-6 left-6 z-20 text-zinc-400 hover:text-[#e78a53] transition-colors duration-200 flex items-center space-x-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Home</span>
            </Link>

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />

            {/* Decorative elements */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-[#e78a53]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#e78a53]/5 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#e78a53]/20 to-[#e78a53]/10 rounded-2xl border border-[#e78a53]/20 mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-[#e78a53]"
                        >
                            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                            <path d="m9 12 2 2 4-4" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
                    <p className="text-zinc-400">Sign in to manage your institution</p>
                </div>

                {/* Login Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white">
                                Admin Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your admin email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53] focus:ring-[#e78a53]/20"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-white">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#e78a53] focus:ring-[#e78a53]/20"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2 text-sm">
                                <input
                                    type="checkbox"
                                    className="rounded border-zinc-700 bg-zinc-800 text-[#e78a53] focus:ring-[#e78a53]/20"
                                />
                                <span className="text-zinc-300">Remember me</span>
                            </label>
                            <Link href="#" className="text-sm text-[#e78a53] hover:text-[#e78a53]/80">
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#e78a53] hover:bg-[#e78a53]/90 text-white font-medium py-3 rounded-xl transition-colors"
                        >
                            {isLoading ? "Signing in..." : "Sign in to Admin Portal"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-zinc-400">
                            Need admin access?{" "}
                            <Link href="/admin/signup" className="text-[#e78a53] hover:text-[#e78a53]/80 font-medium">
                                Request Account
                            </Link>
                        </p>
                    </div>
                </motion.div>

                {/* Admin Info */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-6 p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl"
                >
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-blue-400"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="m9 12 2 2 4-4" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-white mb-1">Admin Access</h3>
                            <p className="text-xs text-zinc-400">
                                Manage faculty, clubs, projects, and institutional settings. Contact your IT administrator for access.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}
