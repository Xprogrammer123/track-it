import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: 'user' | 'admin';
}

type FormType = 'login' | 'register' | 'forgot-password';

export default function AuthModal({ isOpen, onClose, type }: Props) {
  const [formType, setFormType] = useState<FormType>('login');

  const handleClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            {formType === 'login' && (
              <LoginForm
                type={type}
                onForgotPassword={() => setFormType('forgot-password')}
                onRegister={() => setFormType('register')}
              />
            )}

            {formType === 'register' && type === 'user' && (
              <RegisterForm onLogin={() => setFormType('login')} />
            )}

            {formType === 'forgot-password' && (
              <ForgotPasswordForm onBack={() => setFormType('login')} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
