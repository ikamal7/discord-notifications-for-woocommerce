import { __ } from '@wordpress/i18n';

const WelcomeTab = ({ setActiveTab }) => {
    return (
        <div className="welcome-content max-w-4xl bg-white p-8 rounded-lg shadow-sm">
            {/* Header Section */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {__('Welcome to Order Notifications for WooCommerce!', 'discord-notifications-for-woocommerce')}
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {__('Easily connect your WooCommerce store to platforms like Discord, Telegram, Slack, Email, and SMS. Stay updated in real time whenever a new order is placed—no need to log into your dashboard.', 'discord-notifications-for-woocommerce')}
                </p>
            </div>

            {/* Video Demo Section */}
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                            <span className="text-2xl mr-2">🎥</span>
                            {__('Quick Setup Demo', 'discord-notifications-for-woocommerce')}
                        </h2>
                        <p className="text-gray-600 mb-4">
                            {__('Prefer watching instead? Check out our quick 2-minute setup video to get started immediately.', 'discord-notifications-for-woocommerce')}
                        </p>
                        <a 
                            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-red-600 !text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            {__('Watch Demo Video', 'discord-notifications-for-woocommerce')}
                        </a>
                    </div>
                    <div className="hidden md:block ml-6">
                        <div className="w-32 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Getting Started Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-2">🛠️</span>
                    {__('Getting Started', 'discord-notifications-for-woocommerce')}
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-4 font-medium">
                        {__('How to Set Up:', 'discord-notifications-for-woocommerce')}
                    </p>
                    <ol className="space-y-3">
                        <li className="flex items-start">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
                            <span className="text-gray-700">
                                {__('Go to the Settings tab and choose your preferred notification channels.', 'discord-notifications-for-woocommerce')}
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
                            <span className="text-gray-700">
                                {__('Paste your webhook URLs or API credentials for each platform.', 'discord-notifications-for-woocommerce')}
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
                            <span className="text-gray-700">
                                {__('Save your settings and test your integration.', 'discord-notifications-for-woocommerce')}
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">✓</span>
                            <span className="text-gray-700 font-medium">
                                {__('Start receiving real-time order notifications!', 'discord-notifications-for-woocommerce')}
                            </span>
                        </li>
                    </ol>
                    <div className="mt-6">
                        <button 
                            onClick={() => setActiveTab('settings')}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                            {__('Go to Settings', 'discord-notifications-for-woocommerce')}
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-2">💡</span>
                    {__('Why Use This Plugin?', 'discord-notifications-for-woocommerce')}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="flex items-center mb-2">
                            <span className="text-green-600 text-xl mr-2">⚡</span>
                            <h3 className="font-semibold text-gray-900">{__('Save Time', 'discord-notifications-for-woocommerce')}</h3>
                        </div>
                        <p className="text-gray-700 text-sm">{__('Receive instant notifications without logging into your dashboard', 'discord-notifications-for-woocommerce')}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-center mb-2">
                            <span className="text-blue-600 text-xl mr-2">🚀</span>
                            <h3 className="font-semibold text-gray-900">{__('Improve Processing Speed', 'discord-notifications-for-woocommerce')}</h3>
                        </div>
                        <p className="text-gray-700 text-sm">{__('Process orders faster with real-time alerts', 'discord-notifications-for-woocommerce')}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <div className="flex items-center mb-2">
                            <span className="text-purple-600 text-xl mr-2">👥</span>
                            <h3 className="font-semibold text-gray-900">{__('Keep Team Updated', 'discord-notifications-for-woocommerce')}</h3>
                        </div>
                        <p className="text-gray-700 text-sm">{__('Share notifications with your entire team in real time', 'discord-notifications-for-woocommerce')}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <div className="flex items-center mb-2">
                            <span className="text-orange-600 text-xl mr-2">🪶</span>
                            <h3 className="font-semibold text-gray-900">{__('Lightweight & Simple', 'discord-notifications-for-woocommerce')}</h3>
                        </div>
                        <p className="text-gray-700 text-sm">{__('No bloat—just clean, efficient notifications', 'discord-notifications-for-woocommerce')}</p>
                    </div>
                </div>
            </div>

            {/* What's New Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-2">🔔</span>
                    {__("What's New", 'discord-notifications-for-woocommerce')}
                </h2>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-gray-900 mb-2">
                        {__('Latest Update v2.0.0', 'discord-notifications-for-woocommerce')}
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center">
                            <span className="text-green-600 mr-2">✓</span>
                            {__('Added support for multiple email providers (SMTP, SendGrid, Mailgun)', 'discord-notifications-for-woocommerce')}
                        </li>
                        <li className="flex items-center">
                            <span className="text-green-600 mr-2">✓</span>
                            {__('Enhanced Slack formatting with rich message support', 'discord-notifications-for-woocommerce')}
                        </li>
                        <li className="flex items-center">
                            <span className="text-green-600 mr-2">✓</span>
                            {__('Added SMS notifications via Twilio and Nexmo', 'discord-notifications-for-woocommerce')}
                        </li>
                        <li className="flex items-center">
                            <span className="text-green-600 mr-2">✓</span>
                            {__('Improved user interface with better navigation', 'discord-notifications-for-woocommerce')}
                        </li>
                        <li className="flex items-center">
                            <span className="text-green-600 mr-2">✓</span>
                            {__('Bug fixes for Telegram notifications and webhook reliability', 'discord-notifications-for-woocommerce')}
                        </li>
                    </ul>
                </div>
            </div>

            {/* Support Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-2">🙋‍♂️</span>
                    {__('Need Help?', 'discord-notifications-for-woocommerce')}
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-4">
                        {__('For setup assistance, troubleshooting, or feature requests:', 'discord-notifications-for-woocommerce')}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a 
                            href={window.discordWooNotifSettings?.docsLink || '#'} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 !text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            {__('View Documentation', 'discord-notifications-for-woocommerce')}
                        </a>
                        <a 
                            href="https://wordpress.org/support/plugin/discord-notifications-for-woocommerce/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-gray-600 !text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            {__('Contact Support', 'discord-notifications-for-woocommerce')}
                        </a>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center justify-center">
                    <span className="text-2xl mr-2">⭐</span>
                    {__('Love this plugin?', 'discord-notifications-for-woocommerce')}
                </h2>
                <p className="text-gray-600 mb-6">
                    {__('Help us grow by leaving a review on WordPress.org or upgrade to Pro for advanced features! 🙌', 'discord-notifications-for-woocommerce')}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <a 
                        href="https://wordpress.org/support/plugin/discord-notifications-for-woocommerce/reviews/#new-post" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-yellow-500 !text-white rounded-md hover:bg-yellow-600 transition-colors duration-200"
                    >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
                        </svg>
                        {__('Leave a Review', 'discord-notifications-for-woocommerce')}
                    </a>
                    {window.discordWooNotifSettings?.isPro !== true && (
                        <a 
                            href={window.discordWooNotifSettings?.proLink || '#'} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 !text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
                            </svg>
                            {__('Upgrade to Pro', 'discord-notifications-for-woocommerce')}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WelcomeTab;