import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    document.title = 'About • StayFinder';
  }, []);
  const [activeTab, setActiveTab] = useState('story');
  const navigate = useNavigate();
  const stats = [
    { number: '10M+', label: 'Happy Travelers' },
    { number: '500K+', label: 'Properties Listed' },
    { number: '195', label: 'Countries Served' },
    { number: '99.9%', label: 'Uptime Guarantee' }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b9e8c6f8?w=300&h=300&fit=crop&crop=face',
      bio: 'Former travel blogger turned entrepreneur with a passion for connecting people through travel.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Tech visionary with 15+ years experience building scalable platforms for millions of users.'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Award-winning designer focused on creating intuitive and beautiful user experiences.'
    },
    {
      name: 'David Kumar',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'Operations expert ensuring smooth experiences for hosts and guests worldwide.'
    }
  ];

  const values = [
    {
      icon: '🏠',
      title: 'Home Away From Home',
      description: 'We believe every traveler deserves a place that feels like home, no matter where they are in the world.'
    },
    {
      icon: '🤝',
      title: 'Trust & Safety',
      description: 'Building a community where hosts and guests feel secure, respected, and valued in every interaction.'
    },
    {
      icon: '🌍',
      title: 'Global Connection',
      description: 'Connecting cultures and creating meaningful experiences that transcend geographical boundaries.'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'Continuously evolving our platform with cutting-edge technology to enhance your travel experience.'
    }
  ];

  const milestones = [
    { year: '2018', event: 'StayFinder Founded', description: 'Started with a simple idea in a garage' },
    { year: '2019', event: '10K Properties', description: 'Reached our first major milestone' },
    { year: '2020', event: 'Global Expansion', description: 'Expanded to 50+ countries worldwide' },
    { year: '2021', event: '1M Bookings', description: 'Celebrated our millionth successful booking' },
    { year: '2022', event: 'Mobile App Launch', description: 'Launched our iOS and Android apps' },
    { year: '2023', event: '500K Properties', description: 'Half a million properties now available' },
    { year: '2024', event: 'AI Integration', description: 'Introduced smart matching technology' },
    { year: '2025', event: 'Sustainability Focus', description: 'Launched eco-friendly travel initiatives' }
  ];

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 font-semibold rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
          : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About StayFinder
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Revolutionizing the way people discover, book, and experience accommodations around the world
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <TabButton id="story" label="Our Story" isActive={activeTab === 'story'} onClick={setActiveTab} />
            <TabButton id="team" label="Our Team" isActive={activeTab === 'team'} onClick={setActiveTab} />
            <TabButton id="values" label="Our Values" isActive={activeTab === 'values'} onClick={setActiveTab} />
            <TabButton id="timeline" label="Timeline" isActive={activeTab === 'timeline'} onClick={setActiveTab} />
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {/* Our Story Tab */}
            {activeTab === 'story' && (
              <div className="space-y-8">
                <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">Our Story</h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      StayFinder was born from a simple frustration: finding the perfect place to stay shouldn't be complicated, expensive, or impersonal. Our founders, frequent travelers themselves, experienced firsthand the challenges of discovering authentic, comfortable accommodations that felt like home.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      In 2018, we set out to create a platform that would connect travelers with unique properties and amazing hosts worldwide. What started as a small startup has grown into a global community of millions, but our mission remains the same: making travel accessible, authentic, and unforgettable.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Today, StayFinder is more than just a booking platform—we're a community that believes in the power of travel to bring people together, create lasting memories, and open minds to new possibilities.
                    </p>
                  </div>
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=600&h=400&fit=crop"
                      alt="Our Story"
                      className="rounded-xl shadow-lg w-full"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-lg shadow-lg">
                      <div className="text-2xl font-bold">7+ Years</div>
                      <div className="text-sm">of Innovation</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Our Team Tab */}
            {activeTab === 'team' && (
              <div className="space-y-8">
                <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">Meet Our Team</h2>
                <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
                  Our diverse team of passionate individuals works tirelessly to make your travel dreams a reality.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {team.map((member, index) => (
                    <div key={index} className="text-center group">
                      <div className="relative mb-6">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                      <p className="text-red-600 font-semibold mb-4">{member.role}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Our Values Tab */}
            {activeTab === 'values' && (
              <div className="space-y-8">
                <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">Our Values</h2>
                <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
                  These core values guide everything we do and shape the experiences we create for our community.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  {values.map((value, index) => (
                    <div key={index} className="bg-gradient-to-br from-red-50 to-pink-50 p-8 rounded-xl border border-red-100 hover:border-red-200 transition-colors duration-300">
                      <div className="text-4xl mb-4">{value.icon}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div className="space-y-8">
                <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">Our Journey</h2>
                <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
                  From humble beginnings to global impact—here's how we've grown over the years.
                </p>
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-500 to-pink-500 rounded-full"></div>
                  <div className="space-y-12">
                    {milestones.map((milestone, index) => (
                      <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                        <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="text-red-600 font-bold text-xl mb-2">{milestone.year}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.event}</h3>
                            <p className="text-gray-600">{milestone.description}</p>
                          </div>
                        </div>
                        <div className="relative z-10">
                          <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full border-4 border-white shadow-lg"></div>
                        </div>
                        <div className="w-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join millions of travelers who trust StayFinder for their perfect accommodation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate("/listings")} className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg">
              Start Exploring
            </button>
            <button onClick={() => navigate("/register")} className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors duration-200">
              Become a Host
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;