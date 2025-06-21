import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, Users, CreditCard, Home, Shield, Star } from 'lucide-react';
import { useEffect } from 'react';

const FAQ = () => {
  useEffect(() => {
    document.title = 'FAQ • StayFinder';
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'booking', label: 'Booking', icon: CreditCard },
    { id: 'hosting', label: 'Hosting', icon: Home },
    { id: 'account', label: 'Account', icon: Users },
    { id: 'safety', label: 'Safety', icon: Shield },
    { id: 'reviews', label: 'Reviews', icon: Star }
  ];

  const faqData = [
    {
      id: 1,
      category: 'booking',
      question: 'How do I book a stay on StayFinder?',
      answer: 'To book a stay, simply search for your destination, select your dates, choose your preferred property, and complete the booking process. You can pay securely through our platform and receive instant confirmation.'
    },
    {
      id: 2,
      category: 'booking',
      question: 'Can I cancel my booking?',
      answer: 'Yes, you can cancel your booking according to the host\'s cancellation policy. You can view the specific policy before booking and manage your reservations in your account dashboard.'
    },
    {
      id: 3,
      category: 'booking',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely through encrypted channels.'
    },
    {
      id: 4,
      category: 'hosting',
      question: 'How do I become a host on StayFinder?',
      answer: 'To become a host, click "Become a Host" on our homepage, create your listing with photos and descriptions, set your pricing and availability, and complete the verification process. Our team will review and approve your listing.'
    },
    {
      id: 5,
      category: 'hosting',
      question: 'How much commission does StayFinder charge hosts?',
      answer: 'StayFinder charges hosts a competitive 3% service fee on completed bookings. There are no upfront costs or listing fees to get started.'
    },
    {
      id: 6,
      category: 'hosting',
      question: 'When do I get paid as a host?',
      answer: 'Hosts receive payment 24 hours after guest check-in. Payments are transferred to your preferred payment method, whether that\'s bank transfer, PayPal, or other supported methods.'
    },
    {
      id: 7,
      category: 'account',
      question: 'How do I verify my account?',
      answer: 'Account verification involves confirming your email, phone number, and uploading a government-issued ID. This helps build trust and security within our community.'
    },
    {
      id: 8,
      category: 'account',
      question: 'I forgot my password. How do I reset it?',
      answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a secure link to reset your password. The link expires after 24 hours for security.'
    },
    {
      id: 9,
      category: 'safety',
      question: 'How does StayFinder ensure guest and host safety?',
      answer: 'We have multiple safety measures including identity verification, secure messaging, 24/7 customer support, host and guest reviews, and comprehensive insurance coverage for all stays.'
    },
    {
      id: 10,
      category: 'safety',
      question: 'What should I do if I have issues during my stay?',
      answer: 'Contact our 24/7 support team immediately through the app or website. We\'ll work to resolve the issue quickly and can arrange alternative accommodations if necessary.'
    },
    {
      id: 11,
      category: 'reviews',
      question: 'How do reviews work on StayFinder?',
      answer: 'Both guests and hosts can leave reviews after a completed stay. Reviews are published 48 hours after submission and help build trust in our community. All reviews must follow our guidelines.'
    },
    {
      id: 12,
      category: 'reviews',
      question: 'Can I edit or delete my review?',
      answer: 'You can edit your review within 48 hours of submission. After that period, reviews cannot be modified to maintain authenticity and trust in our review system.'
    }
  ];

  const filteredFAQs = faqData.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Find answers to common questions about StayFinder. Can't find what you're looking for? Contact our support team!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg shadow-lg"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:shadow-md'
              }`}
            >
              <category.icon className="w-5 h-5 mr-2" />
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No questions found</h3>
              <p className="text-gray-500">Try adjusting your search terms or category filter.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 pr-4">
                      {item.question}
                    </h3>
                    {openItems[item.id] ? (
                      <ChevronUp className="w-6 h-6 text-pink-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-pink-600 flex-shrink-0" />
                    )}
                  </button>
                  {openItems[item.id] && (
                    <div className="px-8 pb-6">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-8 text-white text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
            <p className="text-lg mb-6 opacity-90">
              Our support team is available 24/7 to assist you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-pink-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                Contact Support
              </button>
              <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-pink-600 transition-all duration-300">
                Live Chat
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-pink-100">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">10M+</h3>
            <p className="text-gray-600">Happy Travelers</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-pink-100">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">2M+</h3>
            <p className="text-gray-600">Properties Listed</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-pink-100">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">4.8/5</h3>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;