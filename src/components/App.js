import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { HashRouter, Routes, Route, useNavigate, useLocation, useSearchParams } from 'react-router-dom';

// Import components
import Header from './Header';
import WelcomeTab from './tabs/WelcomeTab';
import SettingsTab from './tabs/SettingsTab';
import HowToTab from './tabs/HowToTab';
import ComparisonTab from './tabs/ComparisonTab';
import TemplatesTab from './tabs/TemplatesTab';

// Main App wrapper with Router
const App = () => {
    return (
        <HashRouter>
            <AppContent />
        </HashRouter>
    );
};

// App content with routing logic
const AppContent = () => {
    const [settings, setSettings] = useState({
        discord: {
            webhook_url: '',
            enabled: false,
        },
        telegram: {
            bot_token: '',
            chat_id: '',
            enabled: false,
        },
        slack: {
            webhook_url: '',
            enabled: false,
        },
        email: {
            enabled: false,
            provider: 'smtp',
            // SMTP settings
            smtp_host: '',
            smtp_port: '587',
            smtp_username: '',
            smtp_password: '',
            smtp_encryption: 'tls',
            // SendGrid settings
            sendgrid_api_key: '',
            // Mailgun settings
            mailgun_api_key: '',
            mailgun_domain: '',
            mailgun_region: 'us',
            // Sendinblue settings
            sendinblue_api_key: '',
            // Mailjet settings
            mailjet_api_key: '',
            mailjet_secret_key: '',
            // Common email settings
            from_name: '',
            from_email: '',
            recipients: '',
            subject_template: 'New Order #{order_id} - {status}',
        },
        sms: {
            enabled: false,
            provider: 'twilio',
            api_key: '',
            api_secret: '',
            from_number: '',
            to_numbers: '',
        },
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [notice, setNotice] = useState(null);
    const [showProModal, setShowProModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    // Use React Router's useSearchParams hook to get and set URL parameters
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Parse the current URL to determine active tab and provider
    const getTabFromUrl = () => {
        return searchParams.get('tab') || 'welcome';
    };
    
    const getProviderFromUrl = () => {
        return searchParams.get('provider') || 'discord';
    };
    
    const [activeTab, setActiveTab] = useState(getTabFromUrl());

    const isPro = window.discordWooNotifSettings?.isPro || false;

    useEffect(() => {
        fetchSettings();
        
        // Update the active tab when URL changes
        const tab = getTabFromUrl();
        if (tab !== activeTab) {
            setActiveTab(tab);
        }
    }, [location]);

    const fetchSettings = async () => {
        try {
            const response = await apiFetch({ path: '/discord-woo-notif/v1/settings' });
            setSettings(response);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching settings:', error);
            setNotice({
                status: 'error',
                message: __('Failed to load settings.', 'discord-notifications-for-woocommerce'),
            });
            setIsLoading(false);
        }
    };

    const handleSaveSettings = async () => {
        setIsSaving(true);
        setNotice(null);

        try {
            const response = await apiFetch({
                path: '/discord-woo-notif/v1/settings',
                method: 'POST',
                data: settings,
            });

            setSettings(response);
            setNotice({
                status: 'success',
                message: __('Settings saved successfully!', 'discord-notifications-for-woocommerce'),
            });
        } catch (error) {
            console.error('Error saving settings:', error);
            setNotice({
                status: 'error',
                message: __('Failed to save settings.', 'discord-notifications-for-woocommerce'),
            });
        } finally {
            setIsSaving(false);
        }
    };

    const updateDiscordSettings = (key, value) => {
        setSettings({
            ...settings,
            discord: {
                ...settings.discord,
                [key]: value,
            },
        });
    };

    const updateTelegramSettings = (key, value) => {
        setSettings({
            ...settings,
            telegram: {
                ...settings.telegram,
                [key]: value,
            },
        });
    };

    const updateSlackSettings = (key, value) => {
        setSettings({
            ...settings,
            slack: {
                ...settings.slack,
                [key]: value,
            },
        });
    };

    const updateEmailSettings = (key, value) => {
        setSettings({
            ...settings,
            email: {
                ...settings.email,
                [key]: value,
            },
        });
    };

    const updateSmsSettings = (key, value) => {
        setSettings({
            ...settings,
            sms: {
                ...settings.sms,
                [key]: value,
            },
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Tab state management
    
    const tabs = [
        { name: 'welcome', label: __('Welcome', 'discord-notifications-for-woocommerce') },
        { name: 'settings', label: __('Settings', 'discord-notifications-for-woocommerce') },
        { name: 'templates', label: __('Templates', 'discord-notifications-for-woocommerce'), isPro: true },
        { name: 'comparison', label: __('Free vs Pro', 'discord-notifications-for-woocommerce') },
        // { name: 'howto', label: __('How To', 'discord-notifications-for-woocommerce') },
        
    ];

    return (
        <div className="discord-woo-notif-app p-4 max-w-full mx-auto">
            {/* <Header /> */}
            
            {/* Custom Tab Navigation */}
            <div className="border-b border-gray-200">
                <nav className="flex justify-between items-center -mb-px">
                    <div className="flex">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => {
                                    // Check if it's a PRO tab and user doesn't have PRO
                                    if (tab.isPro && !isPro) {
                                        setShowProModal(true);
                                        return;
                                    }
                                    
                                    setActiveTab(tab.name);
                                    const newParams = new URLSearchParams(searchParams);
                                    newParams.set('tab', tab.name);
                                    if (tab.name === 'settings' && !newParams.has('provider')) {
                                        newParams.set('provider', 'discord');
                                    }
                                    setSearchParams(newParams);
                                }}
                                className={`py-4 px-6 font-medium text-sm border-b-2 cursor-pointer flex items-center ${activeTab === tab.name 
                                    ? 'border-blue-500 text-blue-600' 
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                {tab.label}
                                {tab.isPro && !isPro && (
                                    <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        PRO
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        {/* Documentation Link */}
                        <a 
                            href={window.discordWooNotifSettings?.docsLink || '#'} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="py-2 px-4 font-medium text-sm !text-gray-600 hover:!text-gray-800 transition-colors flex items-center space-x-2 cursor-pointer"
                        >
                            <span>{__('Documentation', 'discord-notifications-for-woocommerce')}</span>
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.1667 5H6C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V10.8333M15.5 5H19M19 5V8.5M19 5L9.66667 14.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </a>
                        
                        {/* Upgrade to PRO Link - Only show if not PRO */}
                        {!isPro && (
                            <a 
                                href={window.discordWooNotifSettings?.proLink || '#'} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center px-4 py-2 border-none text-sm font-medium rounded-md shadow-sm !text-blue-600 bg-transparent hover:!text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                            >
                                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
                                </svg>
                                <span>{__('Unlock Pro Features', 'discord-notifications-for-woocommerce')}</span>
                            </a>
                        )}
                    </div>
                </nav>
            </div>
            
            {/* Tab Content */}
            <div className="py-6">
                {notice && (
                    <div className={`mb-4 p-4 rounded-md flex justify-between items-center ${notice.status === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        <div className="flex items-center">
                            {notice.status === 'success' ? (
                                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            )}
                            <span>{notice.message}</span>
                        </div>
                        <button 
                            onClick={() => setNotice(null)} 
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Render the appropriate tab content based on activeTab */}
                {activeTab === 'welcome' && <WelcomeTab setActiveTab={setActiveTab} />}
                
                {activeTab === 'settings' && (
                    <SettingsTab 
                        settings={settings} 
                        updateDiscordSettings={updateDiscordSettings}
                        updateTelegramSettings={updateTelegramSettings}
                        updateSlackSettings={updateSlackSettings}
                        updateEmailSettings={updateEmailSettings}
                        updateSmsSettings={updateSmsSettings}
                        handleSaveSettings={handleSaveSettings} 
                        isSaving={isSaving}
                        activeProvider={getProviderFromUrl()}
                        setActiveProvider={(provider) => {
                            const newParams = new URLSearchParams(searchParams);
                            newParams.set('tab', 'settings');
                            newParams.set('provider', provider);
                            setSearchParams(newParams);
                        }}
                    />
                )}
                
                {activeTab === 'templates' && <TemplatesTab />}
                
                {activeTab === 'comparison' && <ComparisonTab />}
                
                {/* {activeTab === 'howto' && <HowToTab />} */}
            </div>

            {/* PRO Modal */}
            {showProModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-80 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                                <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
                                {__('PRO Feature', 'discord-notifications-for-woocommerce')}
                            </h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500">
                                    {__('This feature is available in the PRO version. Upgrade now to unlock advanced templates and many more features!', 'discord-notifications-for-woocommerce')}
                                </p>
                            </div>
                            <div className="items-center px-4 py-3">
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => setShowProModal(false)}
                                        className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    >
                                        {__('Close', 'discord-notifications-for-woocommerce')}
                                    </button>
                                    <a
                                        href={window.discordWooNotifSettings?.proLink || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-blue-600 !text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 text-center"
                                    >
                                        {__('Upgrade to PRO', 'discord-notifications-for-woocommerce')}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;