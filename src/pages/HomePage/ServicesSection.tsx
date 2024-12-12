import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Package, Truck, Globe, Clock, Shield, Headphones } from 'lucide-react';

const services = [
  {
    icon: Package,
    title: 'Package Tracking',
    description: 'Real-time tracking for all your deliveries with instant updates.',
  },
  {
    icon: Truck,
    title: 'Express Delivery',
    description: 'Fast and reliable delivery services across the country.',
  },
  {
    icon: Globe,
    title: 'Global Shipping',
    description: 'International shipping with comprehensive tracking coverage.',
  },
  {
    icon: Clock,
    title: 'Time-Critical',
    description: 'Specialized service for time-sensitive deliveries.',
  },
  {
    icon: Shield,
    title: 'Secure Shipping',
    description: 'Enhanced security measures for valuable packages.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock customer support for all your queries.',
  },
];

export default function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive shipping and tracking solutions tailored to meet your needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
                <service.icon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}