import { __ } from '@wordpress/i18n';

const ComparisonTab = () => {
    const isPro = window.discordWooNotifSettings?.isPro || false;
    return (
        <div className="max-w-6xl bg-white p-6 rounded-lg shadow-sm">
            <div className="flex flex-row justify-between items-center mb-8">
                <h2 className="text-lg sm:text-2xl font-semibold capitalize">
                    {__('WooCommerce Notification Free vs Pro', 'discord-notifications-for-woocommerce')}
                </h2>
                {!isPro && (<a 
                    href={window.discordWooNotifSettings?.proLink || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm !text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                    {__('Upgrade Now', 'discord-notifications-for-woocommerce')}
                </a>)}
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {__('Features', 'discord-notifications-for-woocommerce')}
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {__('Free', 'discord-notifications-for-woocommerce')}
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {__('Pro', 'discord-notifications-for-woocommerce')}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {__('Discord Notifications', 'discord-notifications-for-woocommerce')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">✅</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">✅</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {__('Telegram Notifications', 'discord-notifications-for-woocommerce')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">✅</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">✅</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {__('Slack Notifications', 'discord-notifications-for-woocommerce')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">❌</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">✅</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {__('Email Notifications', 'discord-notifications-for-woocommerce')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">❌</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">✅</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {__('SMS Notifications', 'discord-notifications-for-woocommerce')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">❌</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">✅</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {__('Multiple Email Providers', 'discord-notifications-for-woocommerce')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">❌</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">✅</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {__('SMTP, SendGrid, Mailgun, Sendinblue, Mailjet', 'discord-notifications-for-woocommerce')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">❌</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">✅</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {__('SMS Providers (Twilio, Nexmo)', 'discord-notifications-for-woocommerce')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">❌</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">✅</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {__('Custom Message Templates', 'discord-notifications-for-woocommerce')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">❌</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">✅</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {__('Advanced Order Status Triggers', 'discord-notifications-for-woocommerce')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">❌</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">✅</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {__('Priority Support', 'discord-notifications-for-woocommerce')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">❌</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">✅</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {__('Regular Updates', 'discord-notifications-for-woocommerce')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">✅</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">✅</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div className="mt-8 text-center">
                {!isPro && (<a 
                    href={window.discordWooNotifSettings?.proLink || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm !text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
                    </svg>
                    {__('Get Pro Version Now', 'discord-notifications-for-woocommerce')}
                </a>)}
            </div>
        </div>
    );
};

export default ComparisonTab;
