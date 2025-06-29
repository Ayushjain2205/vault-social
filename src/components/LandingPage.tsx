import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <motion.h1 
              className="text-7xl font-playful font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Trade Together,<br />
              <span className="text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">
                Win Together! 🎉
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-2xl font-friendly font-medium mb-12 opacity-90 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join the future of social trading with Bitcoin. Follow successful traders, 
              create group vaults, and grow your wealth together with our vibrant community.
            </motion.p>
            
            {/* Call to Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
              <motion.div 
                className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/30 transition-all duration-200 hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-2xl font-playful font-bold mb-3">Copy Trading</h3>
                <p className="text-lg opacity-90 font-friendly">Follow successful traders and copy their moves automatically</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/30 transition-all duration-200 hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="text-6xl mb-4">💎</div>
                <h3 className="text-2xl font-playful font-bold mb-3">Group Trading</h3>
                <p className="text-lg opacity-90 font-friendly">Join forces with others and share profits proportionally</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/30 transition-all duration-200 hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="text-6xl mb-4">⏰</div>
                <h3 className="text-2xl font-playful font-bold mb-3">Time Lock</h3>
                <p className="text-lg opacity-90 font-friendly">Lock your funds for better discipline and long-term gains</p>
              </motion.div>
            </div>

            <motion.button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 py-4 rounded-2xl font-bold text-xl flex items-center mx-auto transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Trading Now
              <ArrowRight className="w-6 h-6 ml-2" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;