import React, { useState } from 'react';
import { FileText, Users, Home, UserX, RefreshCw, AlertTriangle, CheckCircle, Calendar, Scale, Shield, Mail, Phone } from 'lucide-react';

const Terms = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sections = [
    {
      id: 'acceptance',
      icon: CheckCircle,
      title: 'Acceptance of Terms',
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Agreement to Terms</h4>
            <p className="text-blue-800">
              By accessing StayFinder, you confirm that you are at least 18 years old and agree to be legally bound by these terms. 
              If you disagree with any part of these terms, please do not use our services.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">✓ What You Accept</h4>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• These Terms of Service</li>
                <li>• Our Privacy Policy</li>
                <li>• Community Guidelines</li>
                <li>• Booking Terms & Conditions</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-2">⚠️ Important Note</h4>
              <p className="text-orange-800 text-sm">
                These terms may be updated periodically. Continued use of our platform indicates acceptance of any changes.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'services',
      icon: Users,
      title: 'Permitted Use of Services',
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Allowed Activities
              </h4>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• Search and book accommodations</li>
                <li>• List your property (verified hosts)</li>
                <li>• Communicate with other users</li>
                <li>• Leave honest reviews</li>
                <li>• Use our customer support</li>
              </ul>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-900 mb-3 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Prohibited Activities
              </h4>
              <ul className="text-red-800 text-sm space-y-1">
                <li>• Automated scraping or data harvesting</li>
                <li>• Creating fake accounts or reviews</li>
                <li>• Fraudulent bookings or payments</li>
                <li>• Harassment or discriminatory behavior</li>
                <li>• Violating local laws or regulations</li>
              </ul>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
              <Scale className="w-4 h-4 mr-2" />
              Legal Compliance
            </h4>
            <p className="text-yellow-800 text-sm">
              You must comply with all applicable local, state, and federal laws when using our platform. 
              This includes but is not limited to accommodation regulations, tax obligations, and licensing requirements.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'accounts',
      icon: Shield,
      title: 'Account Security & Responsibility',
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Your Account Responsibilities</h4>
            <p className="text-blue-800 mb-3">
              You are fully responsible for maintaining the security and confidentiality of your account credentials.
            </p>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Use a strong, unique password</li>
              <li>• Never share your login credentials</li>
              <li>• Monitor account activity regularly</li>
              <li>• Report suspicious activity immediately</li>
            </ul>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Account Information</h4>
              <p className="text-purple-800 text-sm">
                Provide accurate, current information. Keep your profile updated to ensure smooth transactions and communications.
              </p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-900 mb-2">Unauthorized Access</h4>
              <p className="text-indigo-800 text-sm">
                You're liable for all activities under your account. Contact us immediately if you suspect unauthorized access.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'listings',
      icon: Home,
      title: 'Property Listings & Bookings',
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Host Responsibilities</h4>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• Provide accurate property descriptions</li>
                <li>• Upload current, authentic photos</li>
                <li>• Maintain competitive pricing</li>
                <li>• Respond promptly to inquiries</li>
                <li>• Honor confirmed bookings</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Guest Responsibilities</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Provide accurate booking information</li>
                <li>• Respect property rules and guidelines</li>
                <li>• Communicate any issues promptly</li>
                <li>• Leave properties in good condition</li>
                <li>• Submit honest, fair reviews</li>
              </ul>
            </div>
          </div>
          <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-2 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Platform Role & Limitations
            </h4>
            <p className="text-orange-800 text-sm">
              StayFinder acts as a platform connecting hosts and guests. We are not a party to booking agreements and are not liable 
              for property conditions, host/guest interactions, or booking disputes. All bookings are contracts between users.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Dispute Resolution</h4>
            <p className="text-gray-700 text-sm">
              While we provide support and mediation services for booking disputes, resolution ultimately depends on cooperation 
              between parties. We reserve the right to make final decisions in cases of policy violations.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'termination',
      icon: UserX,
      title: 'Account Termination & Suspension',
      content: (
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-red-900 mb-2">Grounds for Termination</h4>
            <p className="text-red-800 mb-3">
              We may suspend or terminate your account immediately if you violate our terms or engage in harmful activities.
            </p>
            <ul className="text-red-800 text-sm space-y-1">
              <li>• Fraudulent activity or false information</li>
              <li>• Harassment or discriminatory behavior</li>
              <li>• Multiple policy violations</li>
              <li>• Illegal activities or legal violations</li>
              <li>• Abuse of our platform or other users</li>
            </ul>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-900 mb-2">Warning System</h4>
              <p className="text-yellow-800 text-sm">
                Minor violations may result in warnings or temporary restrictions. Repeated violations lead to permanent suspension.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Appeal Process</h4>
              <p className="text-blue-800 text-sm">
                You may appeal account decisions by contacting our support team within 30 days of the action.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Post-Termination</h4>
            <p className="text-gray-700 text-sm">
              Upon termination, your access to the platform ceases immediately. Some provisions of these terms 
              (including liability limitations) survive termination.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'liability',
      icon: Scale,
      title: 'Liability & Disclaimers',
      content: (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h4 className="font-semibold text-red-900 mb-2 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Limitation of Liability
            </h4>
            <p className="text-red-800 text-sm mb-3">
              StayFinder's liability is limited to the maximum extent permitted by law. We are not liable for:
            </p>
            <ul className="text-red-800 text-sm space-y-1">
              <li>• Direct, indirect, or consequential damages</li>
              <li>• Property damage or personal injury</li>
              <li>• Lost profits or business interruption</li>
              <li>• Data loss or system downtime</li>
              <li>• Third-party actions or omissions</li>
            </ul>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">"As Is" Service</h4>
              <p className="text-blue-800 text-sm">
                Our platform is provided "as is" without warranties of any kind, express or implied, including merchantability or fitness for purpose.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">User Indemnification</h4>
              <p className="text-purple-800 text-sm">
                You agree to indemnify and hold StayFinder harmless from any claims arising from your use of our platform.
              </p>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Maximum Liability</h4>
            <p className="text-green-800 text-sm">
              In any case, our total liability to you shall not exceed the amount you paid to us in the 12 months preceding the claim.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'changes',
      icon: RefreshCw,
      title: 'Changes to Terms & Service',
      content: (
        <div className="space-y-4">
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Policy Updates</h4>
            <p className="text-blue-800 text-sm">
              We may revise these terms at any time. Updated versions will be posted on our site, and continued use of StayFinder
              after changes implies your acceptance of the new terms.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-5xl mx-auto">
      {sections.map(({ id, icon: Icon, title, content }) => (
        <div key={id} className="border rounded-lg shadow-sm">
          <button
            onClick={() => toggleSection(id)}
            className="flex items-center justify-between w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-t-lg"
          >
            <div className="flex items-center space-x-2 text-left">
              <Icon className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-800">{title}</span>
            </div>
            <span className="text-gray-600">{expandedSections[id] ? '−' : '+'}</span>
          </button>
          {expandedSections[id] && (
            <div className="p-4 bg-white border-t text-sm text-gray-700">
              {content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Terms;
