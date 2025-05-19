import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const SettingsTab = ({ settings, updateDiscordSettings, updateTelegramSettings, updateSlackSettings, updateEmailSettings, updateSmsSettings, handleSaveSettings, isSaving, activeProvider, setActiveProvider }) => {
    const [showProPopup, setShowProPopup] = useState(false);
    
    // Check if PRO version is active
    const isPro = window.discordWooNotifData?.isPro || false;
    
    // Toggle switch component with full-width click support
    const ToggleSwitch = ({ id, checked, onChange, label }) => (
        <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => onChange({ target: { checked: !checked } })}>
            <label htmlFor={id} className="text-sm font-medium text-gray-700 flex-grow cursor-pointer">
                {label}
            </label>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                <input 
                    type="checkbox" 
                    id={id} 
                    className="sr-only" 
                    checked={checked}
                    onChange={onChange}
                />
                <span 
                    className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}
                ></span>
                <span 
                    className={`absolute left-0 top-0 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 ease-in-out transform ${checked ? 'translate-x-6' : 'translate-x-0'}`}
                ></span>
            </div>
        </div>
    );

    return (
        <div className="settings-content max-w-4xl bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">{__('Notification Settings', 'discord-notifications-for-woocommerce')}</h2>
            
            {/* Provider Tabs - Vertical Layout */}
            <div className="flex mb-6">
                {/* Vertical Navigation */}
                <div className="w-1/4 border-r border-gray-200 pr-4">
                    <nav className="flex flex-col space-y-2">
                        <button
                            onClick={() => setActiveProvider('discord')}
                            className={`py-3 px-4 text-left font-medium text-sm rounded-md transition-colors cursor-pointer ${activeProvider === 'discord' 
                                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'}`}
                        >
                            {__('Discord', 'discord-notifications-for-woocommerce')}
                        </button>
                        <button
                            onClick={() => setActiveProvider('telegram')}
                            className={`py-3 px-4 text-left font-medium text-sm rounded-md transition-colors  cursor-pointer ${activeProvider === 'telegram' 
                                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'}`}
                        >
                            {__('Telegram', 'discord-notifications-for-woocommerce')}
                        </button>
                        <button
                            onClick={() => {
                                if (isPro) {
                                    setActiveProvider('slack');
                                } else {
                                    setShowProPopup(true);
                                }
                            }}
                            className={`py-3 px-4 text-left font-medium text-sm rounded-md transition-colors relative cursor-pointer ${activeProvider === 'slack' 
                                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'} ${!isPro ? 'opacity-75' : ''}`}
                        >
                            {__('Slack', 'discord-notifications-for-woocommerce')}
                            {!isPro && (
                                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded">
                                    {__('PRO', 'discord-notifications-for-woocommerce')}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => {
                                if (isPro) {
                                    setActiveProvider('email');
                                } else {
                                    setShowProPopup(true);
                                }
                            }}
                            className={`py-3 px-4 text-left font-medium text-sm rounded-md transition-colors relative cursor-pointer ${activeProvider === 'email' 
                                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'} ${!isPro ? 'opacity-75' : ''}`}
                        >
                            {__('Email', 'discord-notifications-for-woocommerce')}
                            {!isPro && (
                                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded">
                                    {__('PRO', 'discord-notifications-for-woocommerce')}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => {
                                if (isPro) {
                                    setActiveProvider('sms');
                                } else {
                                    setShowProPopup(true);
                                }
                            }}
                            className={`py-3 px-4 text-left font-medium text-sm rounded-md transition-colors relative cursor-pointer ${activeProvider === 'sms' 
                                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'} ${!isPro ? 'opacity-75' : ''}`}
                        >
                            {__('SMS', 'discord-notifications-for-woocommerce')}
                            {!isPro && (
                                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded">
                                    {__('PRO', 'discord-notifications-for-woocommerce')}
                                </span>
                            )}
                        </button>
                    </nav>
                </div>
                
                {/* Content Area */}
                <div className="w-3/4 pl-6">
            
            {/* Discord Settings */}
            {activeProvider === 'discord' && (
                <div>
                    <ToggleSwitch 
                        id="enable-discord" 
                        checked={settings.discord.enabled} 
                        onChange={(e) => updateDiscordSettings('enabled', e.target.checked)}
                        label={__('Enable Discord Notifications', 'discord-notifications-for-woocommerce')}
                    />
                    
                    {settings.discord.enabled && (
                        <div className="mb-6">
                            <label htmlFor="webhook-url" className="block text-sm font-medium text-gray-700 mb-2">
                                {__('Discord Webhook URL', 'discord-notifications-for-woocommerce')}
                            </label>
                            <input
                                type="text"
                                id="webhook-url"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={settings.discord.webhook_url}
                                onChange={(e) => updateDiscordSettings('webhook_url', e.target.value)}
                                placeholder="https://discord.com/api/webhooks/..."
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                {__('Enter the webhook URL from your Discord server', 'discord-notifications-for-woocommerce')}
                            </p>
                        </div>
                    )}
                </div>
            )}
            
            {/* Telegram Settings */}
            {activeProvider === 'telegram' && (
                <div>
                    <ToggleSwitch 
                        id="enable-telegram" 
                        checked={settings.telegram.enabled || false} 
                        onChange={(e) => updateTelegramSettings('enabled', e.target.checked)}
                        label={__('Enable Telegram Notifications', 'discord-notifications-for-woocommerce')}
                    />
                    
                    {(settings.telegram.enabled || false) && (
                        <>
                            <div className="mb-6">
                                <label htmlFor="bot-token" className="block text-sm font-medium text-gray-700 mb-2">
                                    {__('Bot Token', 'discord-notifications-for-woocommerce')}
                                </label>
                                <input
                                    type="text"
                                    id="bot-token"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={settings.telegram.bot_token}
                                    onChange={(e) => updateTelegramSettings('bot_token', e.target.value)}
                                    placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    {__('Enter the bot token from BotFather', 'discord-notifications-for-woocommerce')}
                                </p>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="chat-id" className="block text-sm font-medium text-gray-700 mb-2">
                                    {__('Chat ID', 'discord-notifications-for-woocommerce')}
                                </label>
                                <input
                                    type="text"
                                    id="chat-id"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={settings.telegram.chat_id}
                                    onChange={(e) => updateTelegramSettings('chat_id', e.target.value)}
                                    placeholder="-100123456789"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    {__('Enter the chat ID where notifications should be sent', 'discord-notifications-for-woocommerce')}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            )}
            
            {/* Slack Settings - PRO */}
            {activeProvider === 'slack' && isPro && (
                <div>
                    <ToggleSwitch 
                        id="enable-slack" 
                        checked={settings.slack?.enabled || false} 
                        onChange={(e) => updateSlackSettings('enabled', e.target.checked)}
                        label={__('Enable Slack Notifications', 'discord-notifications-for-woocommerce')}
                    />
                    
                    {(settings.slack?.enabled || false) && (
                        <div className="mb-6">
                            <label htmlFor="slack-webhook" className="block text-sm font-medium text-gray-700 mb-2">
                                {__('Slack Webhook URL', 'discord-notifications-for-woocommerce')}
                            </label>
                            <input
                                type="text"
                                id="slack-webhook"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={settings.slack?.webhook_url || ''}
                                onChange={(e) => updateSlackSettings('webhook_url', e.target.value)}
                                placeholder="https://hooks.slack.com/services/..."
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                {__('Enter the webhook URL from your Slack workspace', 'discord-notifications-for-woocommerce')}
                            </p>
                        </div>
                    )}
                </div>
            )}
            
            {/* Email Settings - PRO */}
            {activeProvider === 'email' && isPro && (
                <div>
                    <ToggleSwitch 
                        id="enable-email" 
                        checked={settings.email?.enabled || false} 
                        onChange={(e) => updateEmailSettings('enabled', e.target.checked)}
                        label={__('Enable Email Notifications', 'discord-notifications-for-woocommerce')}
                    />
                    
                    {(settings.email?.enabled || false) && (
                        <>
                            <div className="mb-6">
                                <label htmlFor="email-recipients" className="block text-sm font-medium text-gray-700 mb-2">
                                    {__('Email Recipients', 'discord-notifications-for-woocommerce')}
                                </label>
                                <input
                                    type="text"
                                    id="email-recipients"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={settings.email?.recipients || ''}
                                    onChange={(e) => updateEmailSettings('recipients', e.target.value)}
                                    placeholder="email@example.com, another@example.com"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    {__('Enter email addresses separated by commas', 'discord-notifications-for-woocommerce')}
                                </p>
                            </div>
                            
                            <div className="mb-6">
                                <label htmlFor="email-subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    {__('Email Subject Template', 'discord-notifications-for-woocommerce')}
                                </label>
                                <input
                                    type="text"
                                    id="email-subject"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={settings.email?.subject_template || ''}
                                    onChange={(e) => updateEmailSettings('subject_template', e.target.value)}
                                    placeholder="New Order #{order_id} - {status}"
                                />
                            </div>
                        </>
                    )}
                </div>
            )}
            
            {/* SMS Settings - PRO */}
            {activeProvider === 'sms' && isPro && (
                <div>
                    <ToggleSwitch 
                        id="enable-sms" 
                        checked={settings.sms?.enabled || false} 
                        onChange={(e) => updateSmsSettings('enabled', e.target.checked)}
                        label={__('Enable SMS Notifications', 'discord-notifications-for-woocommerce')}
                    />
                    
                    {(settings.sms?.enabled || false) && (
                        <>
                            <div className="mb-6">
                                <label htmlFor="sms-provider" className="block text-sm font-medium text-gray-700 mb-2">
                                    {__('SMS Provider', 'discord-notifications-for-woocommerce')}
                                </label>
                                <select
                                    id="sms-provider"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={settings.sms?.provider || 'twilio'}
                                    onChange={(e) => updateSmsSettings('provider', e.target.value)}
                                >
                                    <option value="twilio">Twilio</option>
                                    <option value="nexmo">Nexmo (Vonage)</option>
                                </select>
                            </div>
                            
                            <div className="mb-6">
                                <label htmlFor="sms-api-key" className="block text-sm font-medium text-gray-700 mb-2">
                                    {__('API Key', 'discord-notifications-for-woocommerce')}
                                </label>
                                <input
                                    type="text"
                                    id="sms-api-key"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={settings.sms?.api_key || ''}
                                    onChange={(e) => updateSmsSettings('api_key', e.target.value)}
                                />
                            </div>
                            
                            <div className="mb-6">
                                <label htmlFor="sms-api-secret" className="block text-sm font-medium text-gray-700 mb-2">
                                    {__('API Secret', 'discord-notifications-for-woocommerce')}
                                </label>
                                <input
                                    type="password"
                                    id="sms-api-secret"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={settings.sms?.api_secret || ''}
                                    onChange={(e) => updateSmsSettings('api_secret', e.target.value)}
                                />
                            </div>
                            
                            <div className="mb-6">
                                <label htmlFor="sms-from" className="block text-sm font-medium text-gray-700 mb-2">
                                    {__('From Number', 'discord-notifications-for-woocommerce')}
                                </label>
                                <input
                                    type="text"
                                    id="sms-from"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={settings.sms?.from_number || ''}
                                    onChange={(e) => updateSmsSettings('from_number', e.target.value)}
                                    placeholder="+1234567890"
                                />
                            </div>
                            
                            <div className="mb-6">
                                <label htmlFor="sms-to" className="block text-sm font-medium text-gray-700 mb-2">
                                    {__('To Number(s)', 'discord-notifications-for-woocommerce')}
                                </label>
                                <input
                                    type="text"
                                    id="sms-to"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={settings.sms?.to_numbers || ''}
                                    onChange={(e) => updateSmsSettings('to_numbers', e.target.value)}
                                    placeholder="+1234567890, +0987654321"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    {__('Enter phone numbers separated by commas', 'discord-notifications-for-woocommerce')}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            )}
            
            {/* PRO Feature Popup */}
            {showProPopup && (
                <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">{__('PRO Feature', 'discord-notifications-for-woocommerce')}</h3>
                        <p className="mb-6">
                            {__('This feature is only available in the PRO version. Upgrade to unlock additional notification channels including Slack, Email, and SMS.', 'discord-notifications-for-woocommerce')}
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button 
                                onClick={() => setShowProPopup(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer"
                            >
                                {__('Close', 'discord-notifications-for-woocommerce')}
                            </button>
                            <a 
                                href="https://example.com/upgrade-to-pro" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-black text-white rounded-md hover:bg-black-700 cursor-pointer"
                            >
                                {__('Upgrade to PRO', 'discord-notifications-for-woocommerce')}
                            </a>
                        </div>
                    </div>
                </div>
            )}

                    <div className="mt-6">
                        <button 
                            className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors ${isSaving ? 'opacity-75 cursor-not-allowed' : ''}`}
                            onClick={handleSaveSettings}
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {__('Saving...', 'discord-notifications-for-woocommerce')}
                                </>
                            ) : __('Save Settings', 'discord-notifications-for-woocommerce')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsTab;