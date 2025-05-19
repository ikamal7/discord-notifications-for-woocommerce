import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { HashRouter, Routes, Route, useNavigate, useLocation, useSearchParams } from 'react-router-dom';

// Import components
import Header from './Header';
import WelcomeTab from './tabs/WelcomeTab';
import SettingsTab from './tabs/SettingsTab';
import HowToTab from './tabs/HowToTab';

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
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [notice, setNotice] = useState(null);
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
        { name: 'howto', label: __('How To', 'discord-notifications-for-woocommerce') },
    ];

    return (
        <div className="discord-woo-notif-app p-4 max-w-full mx-auto">
            {/* <Header /> */}
            
            {/* Custom Tab Navigation */}
            <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => {
                                setActiveTab(tab.name);
                                const newParams = new URLSearchParams(searchParams);
                                newParams.set('tab', tab.name);
                                if (tab.name === 'settings' && !newParams.has('provider')) {
                                    newParams.set('provider', 'discord');
                                }
                                setSearchParams(newParams);
                            }}
                            className={`py-4 px-6 font-medium text-sm border-b-2 cursor-pointer ${activeTab === tab.name 
                                ? 'border-blue-500 text-blue-600' 
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
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
                
                {activeTab === 'howto' && <HowToTab />}
            </div>
        </div>
    );
};

export default App;