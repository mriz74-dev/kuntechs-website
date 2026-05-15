export default function DigitalAI() {
  const solutions = [
    {
      title: 'Machine Learning',
      description: 'Custom ML models trained on your data to predict trends and automate decisions.',
      icon: '🧠',
    },
    {
      title: 'Natural Language Processing',
      description: 'Extract insights from text data and enable intelligent chatbots and automation.',
      icon: '💬',
    },
    {
      title: 'Computer Vision',
      description: 'Automated image and video analysis for quality control and real-time monitoring.',
      icon: '👁️',
    },
    {
      title: 'Predictive Analytics',
      description: 'Forecast future trends with advanced statistical models and data science.',
      icon: '📈',
    },
    {
      title: 'Intelligent Automation',
      description: 'Streamline workflows and reduce manual work with intelligent process automation.',
      icon: '⚙️',
    },
    {
      title: 'Custom AI Solutions',
      description: 'Tailor-made AI systems designed specifically for your business needs.',
      icon: '🎯',
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Digital AI Solutions</h1>
          <p className="text-xl text-gray-600">
            Cutting-edge artificial intelligence technology to automate, optimize, and innovate your business processes.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our AI Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{solution.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{solution.title}</h3>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition">
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Data Engineering', desc: 'Extract, transform, and load data at scale' },
              { title: 'Model Development', desc: 'Build and train AI models for your use case' },
              { title: 'Integration', desc: 'Seamlessly integrate AI into existing systems' },
              { title: 'Monitoring & Support', desc: 'Continuous optimization and 24/7 support' },
            ].map((cap, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{cap.title}</h3>
                <p className="text-gray-600">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
