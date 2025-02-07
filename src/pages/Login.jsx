import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login:', { email, password });
  };

  return (
    <div className="text-center pt-23 pb-45 px-4">
      <h2 className="text-8xl font-bold mb-15 bg-gradient-to-r from-cyan-200 to-green-600 text-transparent bg-clip-text">
        Welcome Back
      </h2>
      
      <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-6">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-12 py-3 bg-gray-800 text-[#e0e0e0] rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-12 py-3 bg-gray-800 text-[#e0e0e0] rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-700 hover:to-green-500 rounded-3xl font-semibold transition-all duration-300"
        >
          Login
        </button>

        <p className="text-[#e0e0e0] mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-green-500 hover:text-green-400">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('Signup:', { name, email, password });
  };

  return (
    <div className="text-center pt-23 pb-45 px-4">
      <h2 className="text-8xl font-bold mb-15 bg-gradient-to-r from-cyan-200 to-green-600 text-transparent bg-clip-text">
        Create Account
      </h2>
      
      <form onSubmit={handleSignup} className="max-w-md mx-auto space-y-6">
        <div className="relative">
          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full px-12 py-3 bg-gray-800 text-[#e0e0e0] rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-12 py-3 bg-gray-800 text-[#e0e0e0] rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-12 py-3 bg-gray-800 text-[#e0e0e0] rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-700 hover:to-green-500 rounded-3xl font-semibold transition-all duration-300"
        >
          Sign Up
        </button>

        <p className="text-[#e0e0e0] mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-green-500 hover:text-green-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export { LoginPage, SignupPage };