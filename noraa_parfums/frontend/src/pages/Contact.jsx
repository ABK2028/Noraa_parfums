import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Instagram, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRegion } from '../components/RegionContext';

export default function Contact() {
  const { region } = useRegion();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = region === 'UK' ? {
    instagram: { label: 'INSTAGRAM', value: '@noraa_parfums', href: 'https://www.instagram.com/noraa_parfums/' },
    whatsapp: { label: 'WHATSAPP', value: '+44 7831 640979', href: 'https://api.whatsapp.com/send?phone=447831640979' },
    email: { label: 'EMAIL', value: 'noraaparfums@gmail.com', href: 'mailto:noraaparfums@gmail.com' },
    snapchat: { label: 'SNAPCHAT', value: 'noraa_parfums', href: 'https://www.snapchat.com/add/noraa_parfums' },
    vinted: { label: 'VINTED', value: 'noraa_parfums', href: 'https://www.vinted.co.uk/member/132207890' }
  } : {
    instagram: { label: 'INSTAGRAM', value: '@noraa_parfums', href: 'https://www.instagram.com/noraa_parfums/' },
    whatsapp: { label: 'WHATSAPP', value: '+91 88489 47543', href: 'https://wa.me/918848947543' },
    email: { label: 'EMAIL', value: 'noraaparfums@gmail.com', href: 'mailto:noraaparfums@gmail.com' }
  };

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: 'var(--color-dark)' }}>
      {/* Hero */}
      <section className="relative py-24 px-4">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1920"
            alt="Contact"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="tracking-[0.3em] text-sm mb-4" style={{ color: 'var(--color-gold)' }}>GET IN TOUCH</p>
            <h1 className="text-4xl md:text-6xl font-extralight text-white tracking-wide">
              Contact Us
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-light text-white mb-6">Let's Connect</h2>
              <p className="text-stone-400 mb-8">
                Our team is dedicated to providing you with an exceptional experience. Reach out to us through any of the channels below, and we'll respond as soon as possible.
              </p>

              <div className="space-y-6">
                {Object.entries(contactInfo).map(([key, item]) => (
                  <div key={key} className="flex items-start gap-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}>
                      {key === 'instagram' && <Instagram className="w-5 h-5" style={{ color: 'var(--color-gold)' }} />}
                      {key === 'whatsapp' && <MessageCircle className="w-5 h-5" style={{ color: 'var(--color-gold)' }} />}
                      {key === 'email' && <Mail className="w-5 h-5" style={{ color: 'var(--color-gold)' }} />}
                      {key === 'snapchat' && (
                        <span className="w-5 h-5 flex items-center justify-center overflow-hidden">
                          <img
                            src="/images/Snapchat.png"
                            alt="Snapchat"
                            className="w-full h-full object-cover block"
                            style={{ transform: 'scale(1.7)', transformOrigin: 'center' }}
                          />
                        </span>
                      )}
                      {key === 'vinted' && (
                        <span className="w-5 h-5 flex items-center justify-center overflow-hidden">
                          <img
                            src="/images/Vinted.png"
                            alt="Vinted"
                            className="w-full h-full object-cover block"
                            style={{ transform: 'scale(1.7)', transformOrigin: 'center' }}
                          />
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-stone-500 text-xs tracking-widest mb-1">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-stone-300 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-xs tracking-widest mb-2 block">NAME</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-stone-900 border-stone-700 text-white focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-white text-xs tracking-widest mb-2 block">EMAIL</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-stone-900 border-stone-700 text-white focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white text-xs tracking-widest mb-2 block">SUBJECT</label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="bg-stone-900 border-stone-700 text-white focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-white text-xs tracking-widest mb-2 block">MESSAGE</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="bg-stone-900 border-stone-700 text-white focus:border-amber-400"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full text-black"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gold-light)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gold)'}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>

                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    Thank you! We'll be in touch soon.
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
