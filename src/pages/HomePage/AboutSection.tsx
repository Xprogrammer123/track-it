import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">About PackageTracker</h2>
            <p className="text-gray-600 mb-4">
              At PackageTracker, we're revolutionizing the way people track their deliveries. Our mission is to provide real-time, accurate tracking information that keeps you connected to your packages every step of the way.
            </p>
            <p className="text-gray-600 mb-6">
              Founded in 2024, we've quickly become the most reliable package tracking service, combining cutting-edge technology with exceptional customer service to ensure you're always informed about your deliveries.
            </p>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-600 rounded-full" />
                <span className="font-semibold">Real-time Updates</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-600 rounded-full" />
                <span className="font-semibold">Global Coverage</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-600 rounded-full" />
                <span className="font-semibold">24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Our Team"
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}