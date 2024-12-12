import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Map, Zap } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    icon: Clock,
    title: 'Real-Time Tracking',
    description: 'Get updates every time you check your package\'s status.',
  },
  {
    icon: Map,
    title: 'Accurate Delivery Estimates',
    description: 'Know exactly when your package will arrive.',
  },
  {
    icon: Zap,
    title: 'Smooth Animations & Interactions',
    description: 'A visually appealing and user-friendly experience.',
  },
];

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Why Choose Our Tracking System?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
                <feature.icon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}