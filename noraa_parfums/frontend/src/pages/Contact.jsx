import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Instagram, Send, Star, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRegion } from '../components/RegionContext';
import { getAllReviews, loadFrontendReviews, saveFrontendReviews, getInitials } from '../components/reviews/reviewUtils';

export default function Contact() {
  const { region } = useRegion();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const requestedPerfume = params.get('perfume') || '';
  const requestedSize = params.get('size') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    author_name: '',
    author_title: '',
    company: '',
    rating: 0,
    content: '',
  });
  const [reviews, setReviews] = useState(() => getAllReviews());
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    if (!requestedPerfume) return;

    const subject = `Perfume Request: ${requestedPerfume}`;
    const sizeText = requestedSize ? `${requestedSize}ml` : 'preferred size not selected';
    const message = `Hi Noraa, I would like to request ${requestedPerfume} in ${sizeText}.`;

    setFormData((prev) => ({
      ...prev,
      subject,
      message,
    }));
  }, [requestedPerfume, requestedSize]);

  useEffect(() => {
    const refreshReviews = () => {
      setReviews(getAllReviews());
    };

    window.addEventListener('storage', refreshReviews);
    window.addEventListener('reviews-updated', refreshReviews);

    return () => {
      window.removeEventListener('storage', refreshReviews);
      window.removeEventListener('reviews-updated', refreshReviews);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappPhone = contactInfo.whatsapp.phone;
    const whatsappMessage = [
      'Hello Noraa Parfums,',
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Subject: ${formData.subject}`,
      `Message: ${formData.message}`,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!reviewForm.author_name || !reviewForm.content || !reviewForm.rating) {
      return;
    }

    setIsSubmittingReview(true);

    const detailBits = [reviewForm.author_title, reviewForm.company].filter(Boolean).join(' | ');
    const reviewText = reviewForm.content.trim();
    const reviewLocation = detailBits || 'Verified Customer';

    const newReview = {
      id: Date.now(),
      name: reviewForm.author_name.trim(),
      initials: getInitials(reviewForm.author_name),
      rating: Number(reviewForm.rating) || 5,
      text: reviewText,
      location: reviewLocation,
      created_at: new Date().toISOString(),
    };

    const localReviews = loadFrontendReviews();
    const updatedLocalReviews = [newReview, ...localReviews];
    saveFrontendReviews(updatedLocalReviews);
    setReviews(getAllReviews());
    window.dispatchEvent(new Event('reviews-updated'));

    setShowReviewForm(false);
    setReviewForm({ author_name: '', author_title: '', company: '', rating: 0, content: '' });
    setHoverRating(0);
    setIsSubmittingReview(false);
  };

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / reviews.length).toFixed(1)
      : null;

  const contactInfo = region === 'UK' ? {
    instagram: { label: 'INSTAGRAM', value: '@noraa_parfums', href: 'https://www.instagram.com/noraa_parfums/' },
    whatsapp: { label: 'WHATSAPP', value: '+44 7831 640979', href: 'https://wa.me/447831640979', phone: '447831640979' },
    email: { label: 'EMAIL', value: 'noraaparfums@gmail.com', href: 'mailto:noraaparfums@gmail.com' },
    snapchat: { label: 'SNAPCHAT', value: 'noraa_parfums', href: 'https://www.snapchat.com/add/noraa_parfums' },
    vinted: { label: 'VINTED', value: 'noraa_parfums', href: 'https://www.vinted.co.uk/member/132207890' }
  } : {
    instagram: { label: 'INSTAGRAM', value: '@noraa_parfums', href: 'https://www.instagram.com/noraa_parfums/' },
    whatsapp: { label: 'WHATSAPP', value: '+91 88489 47543', href: 'https://wa.me/918848947543', phone: '918848947543' },
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

      {/* Reviews */}
      <section className="py-16 px-4" style={{ backgroundColor: 'var(--color-dark-lighter)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <p className="tracking-[0.3em] text-xs mb-6" style={{ color: 'var(--color-gold)' }}>
                WHAT OUR CLIENTS SAY
              </p>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
                Customer <span className="italic" style={{ color: 'var(--color-gold)' }}>Reviews</span>
              </h2>
              <p className="text-stone-400 text-lg mb-8">
                Discover the experiences of those who wear our fragrances.
              </p>
            </motion.div>

            {avgRating && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                className="inline-flex items-center gap-3 rounded-full px-6 py-2 mb-8"
                style={{
                  backgroundColor: 'rgba(212,175,55,0.1)',
                  border: '1px solid rgba(212,175,55,0.2)',
                }}
              >
                <span className="text-2xl font-light text-white">{avgRating}</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= Math.round(Number(avgRating)) ? 'fill-amber-400 text-amber-400' : 'text-stone-700'}`}
                    />
                  ))}
                </div>
                <span className="text-stone-500 text-sm">({reviews.length} reviews)</span>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              className="mt-2"
            >
              <Button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="text-black text-sm tracking-widest px-8"
                style={{ backgroundColor: 'var(--color-gold)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gold-light)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gold)'}
              >
                {showReviewForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                {showReviewForm ? 'Cancel' : 'Write a Review'}
              </Button>
            </motion.div>
          </div>

          {showReviewForm && (
            <div className="max-w-xl mx-auto px-4 mb-12">
              <form
                onSubmit={handleReviewSubmit}
                className="rounded-2xl p-6 space-y-4"
                style={{
                  backgroundColor: 'var(--color-dark)',
                  border: '1px solid rgba(212,175,55,0.15)',
                }}
              >
                <h3 className="font-light text-white text-lg">Share your experience</h3>

                <div>
                  <label className="text-xs tracking-widest text-stone-500 mb-2 block">YOUR RATING</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onMouseEnter={() => setHoverRating(s)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setReviewForm((prev) => ({ ...prev, rating: s }))}
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${s <= (hoverRating || reviewForm.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-700'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs tracking-widest text-stone-500 mb-1 block">YOUR NAME *</label>
                    <Input
                      value={reviewForm.author_name}
                      onChange={(e) => setReviewForm((prev) => ({ ...prev, author_name: e.target.value }))}
                      placeholder="Jane Doe"
                      required
                      className="bg-stone-900 border-stone-700 text-white placeholder:text-stone-600 focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest text-stone-500 mb-1 block">TITLE / ROLE</label>
                    <Input
                      value={reviewForm.author_title}
                      onChange={(e) => setReviewForm((prev) => ({ ...prev, author_title: e.target.value }))}
                      placeholder="Fragrance Enthusiast"
                      className="bg-stone-900 border-stone-700 text-white placeholder:text-stone-600 focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs tracking-widest text-stone-500 mb-1 block">COMPANY</label>
                  <Input
                    value={reviewForm.company}
                    onChange={(e) => setReviewForm((prev) => ({ ...prev, company: e.target.value }))}
                    placeholder="Acme Inc."
                    className="bg-stone-900 border-stone-700 text-white placeholder:text-stone-600 focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs tracking-widest text-stone-500 mb-1 block">YOUR REVIEW *</label>
                  <Textarea
                    value={reviewForm.content}
                    onChange={(e) => setReviewForm((prev) => ({ ...prev, content: e.target.value }))}
                    placeholder="Tell us about your experience..."
                    rows={4}
                    required
                    className="bg-stone-900 border-stone-700 text-white placeholder:text-stone-600 focus:border-amber-400"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmittingReview || !reviewForm.rating}
                  className="w-full text-black tracking-widest text-sm"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                >
                  {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                </Button>
              </form>
            </div>
          )}

          <div className="px-4 pb-4">
            {reviews.length === 0 ? (
              <div className="text-center py-20 text-stone-600">
                <Star className="w-12 h-12 mx-auto mb-3 text-stone-800" />
                <p className="text-lg font-light text-stone-500">No reviews yet. Be the first to share your experience.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id ?? `fallback-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.3), ease: 'easeOut' }}
                    className="rounded-2xl p-6 border h-[360px] flex flex-col"
                    style={{
                      backgroundColor: 'var(--color-dark)',
                      borderColor: 'rgba(201,169,98,0.2)',
                    }}
                  >
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={`${review.id ?? `fallback-${index}`}-star-${i}`}
                          className={`w-4 h-4 ${i < Number(review.rating || 0) ? 'fill-amber-400 text-amber-400' : 'text-stone-700'}`}
                        />
                      ))}
                    </div>
                    <p className="text-stone-300 text-sm leading-relaxed mt-4 mb-6 font-light italic flex-1 overflow-y-auto">"{review.text}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t mt-2" style={{ borderColor: 'rgba(201,169,98,0.15)' }}>
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium tracking-wider"
                        style={{
                          backgroundColor: 'rgba(201,169,98,0.12)',
                          color: 'var(--color-gold)',
                          border: '1px solid rgba(201,169,98,0.3)',
                        }}
                      >
                        {review.initials}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{review.name}</p>
                        <p className="text-stone-500 text-xs tracking-wide">{review.location}</p>
                        <p className="text-stone-600 text-[11px] mt-1">
                          {review.created_at ? new Date(review.created_at).toLocaleDateString() : ''}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
