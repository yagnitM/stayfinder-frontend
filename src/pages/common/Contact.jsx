import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Users } from 'lucide-react';
import { useEffect } from 'react';

const Contact = () => {
  useEffect(() => {
    document.title = 'Contact Us • StayFinder';
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      category: 'general'
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      info: 'support@stayfinder.com',
      description: 'Get in touch via email'
    },
    {
      icon: Phone,
      title: 'Call Us',
      info: '+1 (555) 123-4567',
      description: '24/7 customer support'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      info: '123 Travel Street, City, State 12345',
      description: 'Our headquarters'
    }
  ];

  const supportCategories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'booking', label: 'Booking Support' },
    { value: 'host', label: 'Host Support' },
    { value: 'technical', label: 'Technical Issue' },
    { value: 'billing', label: 'Billing Question' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact StayFinder</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            We're here to help make your travel experience exceptional. Reach out to us anytime!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-lg font-medium text-gray-700 mb-2">{item.info}</p>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100">
            <div className="flex items-center mb-6">
              <MessageCircle className="w-8 h-8 text-pink-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Send us a Message</h2>
            </div>
            
            {isSubmitted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-medium">✓ Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                >
                  {supportCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-red-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-8">
            {/* Response Times */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100">
              <div className="flex items-center mb-6">
                <Clock className="w-8 h-8 text-pink-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Response Times</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">General Inquiries</span>
                  <span className="font-semibold text-pink-600">24-48 hours</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Booking Support</span>
                  <span className="font-semibold text-pink-600">2-4 hours</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Technical Issues</span>
                  <span className="font-semibold text-pink-600">1-2 hours</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Emergency Support</span>
                  <span className="font-semibold text-pink-600">Immediate</span>
                </div>
              </div>
            </div>

            {/* Support Team */}
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-bold">Our Support Team</h3>
              </div>
              <p className="text-lg mb-4 opacity-90">
                Our dedicated support team is available 24/7 to help you with any questions or concerns.
              </p>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <p className="font-semibold mb-2">Available Languages:</p>
                <p className="opacity-90">English, Spanish, French, German, Italian, Portuguese</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;