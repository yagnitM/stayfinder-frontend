import React, { useState } from 'react';
import { Shield, Eye, Users, Cookie, Lock, User, ChevronDown, ChevronRight, Calendar, Mail, Phone } from 'lucide-react';
import { useEffect } from 'react';

const Privacy = () => {
  useEffect(() => {
    document.title = 'Privacy • StayFinder';
  }, []);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sections = [
    {
      id: 'collection',
      icon: Eye,
      title: 'Information We Collect',
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Personal Information</h4>
            <ul className="text-blue-800 space-y-1">
              <li>• Full name and contact details</li>
              <li>• Email address and phone number</li>
              <li>• Payment information (securely processed)</li>
              <li>• Profile preferences and settings</li>
            </ul>
          </div>
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-green-900 mb-2">Usage Data</h4>
            <ul className="text-green-800 space-y-1">
              <li>• Search queries and booking history</li>
              <li>• Device information and IP address</li>
              <li>• Website interaction patterns</li>
              <li>• Location data (with your permission)</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'usage',
      icon: Users,
      title: 'How We Use Your Information',
      content: (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Service Delivery</h4>
            <p className="text-purple-800 text-sm">Process bookings, manage your account, and provide customer support</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <h4 className="font-semibold text-indigo-900 mb-2">Communication</h4>
            <p className="text-indigo-800 text-sm">Send booking confirmations, updates, and relevant notifications</p>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
            <h4 className="font-semibold text-teal-900 mb-2">Improvement</h4>
            <p className="text-teal-800 text-sm">Analyze usage patterns to enhance our platform and user experience</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">Security</h4>
            <p className="text-orange-800 text-sm">Prevent fraud, abuse, and ensure platform safety for all users</p>
          </div>
        </div>
      )
    },
    {
      id: 'sharing',
      icon: Shield,
      title: 'Information Sharing & Protection',
      content: (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h4 className="font-semibold text-red-900 mb-2 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              We Never Sell Your Data
            </h4>
            <p className="text-red-800">Your personal information is never sold to third parties for marketing purposes.</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Limited Sharing Scenarios:</h4>
            <div className="grid gap-3">
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <span className="font-medium">Service Providers:</span>
                  <p className="text-sm text-gray-600">Trusted partners who help us operate our platform (payment processors, hosting services)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <span className="font-medium">Legal Requirements:</span>
                  <p className="text-sm text-gray-600">When required by law, court order, or to protect our rights and safety</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'cookies',
      icon: Cookie,
      title: 'Cookies & Tracking',
      content: (
        <div className="space-y-4">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-amber-900 mb-2">Essential Cookies</h4>
            <p className="text-amber-800 text-sm">Required for basic website functionality, login, and security. Cannot be disabled.</p>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Analytics Cookies</h4>
            <p className="text-blue-800 text-sm">Help us understand how you use our site to improve performance and user experience.</p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-green-900 mb-2">Preference Cookies</h4>
            <p className="text-green-800 text-sm">Remember your settings and preferences for a personalized experience.</p>
          </div>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Cookie Control:</strong> You can manage cookie preferences in your browser settings or through our cookie consent banner.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      icon: Lock,
      title: 'Data Security Measures',
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-600 text-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Encryption</h4>
              <p className="text-sm opacity-90">All data transmitted using industry-standard SSL/TLS encryption</p>
            </div>
            <div className="bg-green-600 text-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Secure Storage</h4>
              <p className="text-sm opacity-90">Data stored in secure, access-controlled environments</p>
            </div>
            <div className="bg-purple-600 text-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Regular Audits</h4>
              <p className="text-sm opacity-90">Ongoing security assessments and vulnerability testing</p>
            </div>
            <div className="bg-indigo-600 text-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Access Controls</h4>
              <p className="text-sm opacity-90">Strict employee access policies and authentication requirements</p>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>Important:</strong> While we implement robust security measures, no system is 100% secure. 
              We continuously work to protect your data and promptly address any security concerns.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'rights',
      icon: User,
      title: 'Your Privacy Rights',
      content: (
        <div className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Eye className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-900">Access Your Data</h4>
                <p className="text-blue-800 text-sm">Request a copy of all personal information we have about you</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <User className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-green-900">Update Information</h4>
                <p className="text-green-800 text-sm">Correct or update your personal details at any time</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg border border-red-200">
              <Shield className="w-5 h-5 text-red-600 mt-1" />
              <div>
                <h4 className="font-semibold text-red-900">Delete Your Data</h4>
                <p className="text-red-800 text-sm">Request deletion of your personal information (subject to legal requirements)</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <Lock className="w-5 h-5 text-purple-600 mt-1" />
              <div>
                <h4 className="font-semibold text-purple-900">Restrict Processing</h4>
                <p className="text-purple-800 text-sm">Limit how we use your data in certain circumstances</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Contact Us for Privacy Requests</h4>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">privacy@stayfinder.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">1-800-PRIVACY</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your privacy is fundamental to us. This policy explains how StayFinder collects, uses, and protects 
            your personal information with complete transparency and respect for your rights.
          </p>
        </div>

        {/* Last Updated Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            <Calendar className="w-4 h-4" />
            <span>Last updated: June 17, 2025</span>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections[section.id];
            
            return (
              <div key={section.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                  </div>
                  <div className="text-gray-400">
                    {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="pt-4">
                      {section.content}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 p-6 bg-gray-900 text-white rounded-xl">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Questions About Privacy?</h3>
            <p className="text-gray-300 mb-4">
              We're here to help. Contact our privacy team for any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>privacy@stayfinder.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>1-800-PRIVACY (1-800-774-8229)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;