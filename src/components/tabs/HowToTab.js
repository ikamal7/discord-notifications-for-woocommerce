import { __ } from '@wordpress/i18n';

const HowToTab = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">{__('How to Use', 'discord-notifications-for-woocommerce')}</h2>
            <ol className="list-decimal pl-5 space-y-3">
                <li>{__('Create a webhook in your Discord server settings', 'discord-notifications-for-woocommerce')}</li>
                <li>{__('Copy the webhook URL', 'discord-notifications-for-woocommerce')}</li>
                <li>{__('Paste the URL in the settings tab', 'discord-notifications-for-woocommerce')}</li>
                <li>{__('Enable notifications', 'discord-notifications-for-woocommerce')}</li>
                <li>{__('Save your settings', 'discord-notifications-for-woocommerce')}</li>
            </ol>
        </div>
    );
};

export default HowToTab;