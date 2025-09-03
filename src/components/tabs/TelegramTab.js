import { __ } from '@wordpress/i18n';

const TelegramTab = ({ settings, updateTelegramSettings, handleSaveSettings, isSaving }) => {
    return (
        <div className="settings-content bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">{__('Telegram Notification Settings', 'discord-notifications-for-woocommerce')}</h2>
            
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
    );
};

export default TelegramTab;