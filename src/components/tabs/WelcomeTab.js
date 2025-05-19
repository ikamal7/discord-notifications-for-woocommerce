import { __ } from '@wordpress/i18n';

const WelcomeTab = ({ setActiveTab }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">{__('Welcome to Discord Notifications for WooCommerce!', 'discord-notifications-for-woocommerce')}</h2>
            <p className="mb-4">{__('This plugin allows you to send WooCommerce order notifications to your Discord server.', 'discord-notifications-for-woocommerce')}</p>
            <div className="mt-6">
                <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                    onClick={() => {
                        setActiveTab('settings');
                    }}
                >
                    {__('Configure Settings', 'discord-notifications-for-woocommerce')}
                </button>
            </div>
        </div>
    );
};

export default WelcomeTab;