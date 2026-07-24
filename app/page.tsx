// app/page.tsx

import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section - Home */}
        <section id="home" className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="text-7xl mb-6">🥫</div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Welcome to PantryPal
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Organize your pantry, track expiration dates, and reduce food waste 
              with a simple and intuitive pantry management application.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/login"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg transition-colors font-medium text-lg"
              >
                Get Started
              </Link>
              <Link
                href="/register"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3 rounded-lg transition-colors font-medium text-lg"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Get started with PantryPal in three simple steps
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  1️⃣
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Create Account
                </h3>
                <p className="text-gray-600">
                  Sign up for free and set up your personal pantry profile.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  2️⃣
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Add Items
                </h3>
                <p className="text-gray-600">
                  Enter your pantry items with names, quantities, and expiration dates.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  3️⃣
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Stay Organized
                </h3>
                <p className="text-gray-600">
                  Track expiration dates, get reminders, and reduce food waste.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Benefits of Using PantryPal
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl">💰</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Save Money</h3>
                  <p className="text-gray-600">
                    Reduce food waste by knowing what you have and when it expires.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl">🌱</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Reduce Waste</h3>
                  <p className="text-gray-600">
                    Make a positive impact on the environment by wasting less food.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl">⏱️</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Save Time</h3>
                  <p className="text-gray-600">
                    Quick search and filters help you find items in seconds.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl">🧠</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Stay Organized</h3>
                  <p className="text-gray-600">
                    Keep your pantry tidy with categories, locations, and quantities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-emerald-50 py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600">1000+</div>
                <p className="text-gray-600 mt-2">Active Users</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600">5000+</div>
                <p className="text-gray-600 mt-2">Items Tracked</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600">90%</div>
                <p className="text-gray-600 mt-2">Waste Reduction</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-emerald-600 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto text-lg">
              Join thousands of users who are already managing their pantry 
              efficiently with PantryPal.
            </p>
            <Link
              href="/register"
              className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 rounded-lg transition-colors font-medium text-lg inline-block"
            >
              Create Free Account
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">🥫 PantryPal</h3>
              <p className="text-gray-400 text-sm">
                Organize your pantry, track expiration dates, and reduce food waste.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#home" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="hover:text-white transition-colors">
                    Benefits
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Track Inventory</li>
                <li>Expiration Alerts</li>
                <li>Smart Dashboard</li>
                <li>Search & Filter</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Get Started</h4>
              <p className="text-gray-400 text-sm mb-4">
                Start managing your pantry today!
              </p>
              <Link
                href="/register"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors text-sm inline-block"
              >
                Create Account
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} PantryPal. All rights reserved.</p>
            <p className="mt-1">Made with ❤️ for better pantry management</p>
          </div>
        </div>
      </footer>
    </div>
  );
}