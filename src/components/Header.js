import { __ } from '@wordpress/i18n';

const Header = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { name: 'welcome', label: __('Welcome', 'discord-notifications-for-woocommerce') },
        { name: 'settings', label: __('Settings', 'discord-notifications-for-woocommerce') },
        { name: 'howto', label: __('How To Use', 'discord-notifications-for-woocommerce') },
    ];

    return (
        <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="px-6 py-4">
                <h1 className="text-2xl font-bold text-gray-800">{__('Discord Notifications for WooCommerce', 'discord-notifications-for-woocommerce')}</h1>
                <p className="text-gray-600 mt-1">{__('Configure Discord and Telegram notifications for your WooCommerce store.', 'discord-notifications-for-woocommerce')}</p>
            </div>
            
            {/* Tab Navigation */}
            <div className="px-6">
                <nav className="flex">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`py-3 px-5 font-medium text-sm border-b-2c cursor-pointer ${activeTab === tab.name 
                                ? 'border-blue-500 text-blue-600' 
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Header;