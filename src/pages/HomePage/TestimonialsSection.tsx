import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Online Shopper',
    content: 'The real-time tracking is incredibly accurate. I always know exactly where my packages are!',
  },
  {
    name: 'Michael Chen',
    role: 'Business Owner',
    content: 'This tracking system has revolutionized how we manage our shipments. The interface is intuitive and reliable.',
  },
  {
    name: 'Emma Davis',
    role: 'Regular Customer',
    content: 'I love how the countdown updates automatically. It makes tracking packages actually enjoyable!',
  },
];

export default function TestimonialsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12"
        >
          What Our Users Say
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg relative"
            >
              <Quote className="w-8 h-8 text-red-200 absolute -top-4 -left-4" />
              <p className="text-gray-600 mb-4">{testimonial.content}</p>
              <div className="mt-4">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}