import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const TemplatesTab = () => {
    const [template, setTemplate] = useState('');
    const [smsTemplate, setSmsTemplate] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [notice, setNotice] = useState(null);
    const [showProModal, setShowProModal] = useState(false);

    // Check if PRO version is active
    const isPro = window.discordWooNotifSettings?.isPro || false;

    useEffect(() => {
        if (isPro) {
            fetchTemplate();
        } else {
            setIsLoading(false);
        }
    }, [isPro]);

    const fetchTemplate = async () => {
        try {
            const response = await apiFetch({ path: '/discord-woo-notif/v1/templates' });
            setTemplate(response.template || '');
            setSmsTemplate(response.sms_template || '');
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching template:', error);
            setNotice({
                status: 'error',
                message: __('Failed to load template.', 'discord-notifications-for-woocommerce'),
            });
            setIsLoading(false);
        }
    };

    const handleSaveTemplate = async () => {
        if (!isPro) {
            setShowProModal(true);
            return;
        }

        setIsSaving(true);
        setNotice(null);

        try {
            await apiFetch({
                path: '/discord-woo-notif/v1/templates',
                method: 'POST',
                data: { 
                    template,
                    sms_template: smsTemplate 
                },
            });

            setNotice({
                status: 'success',
                message: __('Template saved successfully!', 'discord-notifications-for-woocommerce'),
            });
        } catch (error) {
            console.error('Error saving template:', error);
            setNotice({
                status: 'error',
                message: __('Failed to save template.', 'discord-notifications-for-woocommerce'),
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleTextareaClick = () => {
        if (!isPro) {
            setShowProModal(true);
        }
    };

    const templateTags = [
        { tag: '{order_id}', description: __('Order ID', 'discord-notifications-for-woocommerce') },
        { tag: '{order_number}', description: __('Order Number', 'discord-notifications-for-woocommerce') },
        { tag: '{status}', description: __('Order Status', 'discord-notifications-for-woocommerce') },
        { tag: '{total}', description: __('Order Total', 'discord-notifications-for-woocommerce') },
        { tag: '{currency}', description: __('Currency Symbol', 'discord-notifications-for-woocommerce') },
        { tag: '{customer_name}', description: __('Customer Name', 'discord-notifications-for-woocommerce') },
        { tag: '{customer_email}', description: __('Customer Email', 'discord-notifications-for-woocommerce') },
        { tag: '{billing_address}', description: __('Billing Address', 'discord-notifications-for-woocommerce') },
        { tag: '{shipping_address}', description: __('Shipping Address', 'discord-notifications-for-woocommerce') },
        { tag: '{payment_method}', description: __('Payment Method', 'discord-notifications-for-woocommerce') },
        { tag: '{order_date}', description: __('Order Date', 'discord-notifications-for-woocommerce') },
        { tag: '{order_time}', description: __('Order Time', 'discord-notifications-for-woocommerce') },
        { tag: '{products}', description: __('Product List', 'discord-notifications-for-woocommerce') },
        { tag: '{product_count}', description: __('Number of Products', 'discord-notifications-for-woocommerce') },
        { tag: '{site_name}', description: __('Site Name', 'discord-notifications-for-woocommerce') },
        { tag: '{site_url}', description: __('Site URL', 'discord-notifications-for-woocommerce') },
    ];

    const defaultTemplate = `🛒 **New Order Received!**

**Order Details:**
• Order ID: {order_id}
• Order Number: {order_number}
• Status: {status}
• Total: {total} {currency}

**Customer Information:**
• Name: {customer_name}
• Email: {customer_email}

**Products:**
{products}

**Payment Method:** {payment_method}
**Order Date:** {order_date} at {order_time}

View order: {site_url}/wp-admin/post.php?post={order_id}&action=edit`;

    const defaultSmsTemplate = `New Order #{order_number}
Customer: {customer_name}
Total: {total} {currency}
Status: {status}
Products: {product_count} items
Date: {order_date}`;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl bg-white p-6 rounded-lg shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                        <span className="text-2xl mr-2">📝</span>
                        {__('Custom Templates', 'discord-notifications-for-woocommerce')}
                        {!isPro && (
                            <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                {__('PRO', 'discord-notifications-for-woocommerce')}
                            </span>
                        )}
                    </h2>
                    <p className="text-gray-600 mt-1">
                        {__('Customize your notification messages with dynamic template tags.', 'discord-notifications-for-woocommerce')}
                    </p>
                </div>
                {!isPro && (
                    <button
                        onClick={() => setShowProModal(true)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 !text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
                        </svg>
                        {__('Upgrade to PRO', 'discord-notifications-for-woocommerce')}
                    </button>
                )}
            </div>

            {/* Notice */}
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

            {/* Template Editor */}
            <div className="space-y-6">
                {/* General Template */}
                <div>
                    <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-2">
                        {__('General Notification Template', 'discord-notifications-for-woocommerce')}
                        <span className="text-xs text-gray-500 ml-2">
                            {__('(Discord, Telegram, Slack, Email)', 'discord-notifications-for-woocommerce')}
                        </span>
                    </label>
                    <div className="relative">
                        <textarea
                            id="template"
                            rows={12}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm ${!isPro ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                            placeholder={isPro ? __('Enter your custom notification template...', 'discord-notifications-for-woocommerce') : __('Upgrade to PRO to customize templates', 'discord-notifications-for-woocommerce')}
                            value={isPro ? template : defaultTemplate}
                            onChange={(e) => isPro && setTemplate(e.target.value)}
                            onClick={handleTextareaClick}
                            disabled={!isPro}
                        />
                        {!isPro && (
                            <div className="absolute inset-0 bg-gray-50 bg-opacity-75 flex items-center justify-center rounded-md">
                                <div className="text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <p className="text-sm text-gray-600 font-medium">
                                        {__('PRO Feature', 'discord-notifications-for-woocommerce')}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        {__('This template will be used for Discord, Telegram, Slack, and Email notifications. Supports Markdown formatting.', 'discord-notifications-for-woocommerce')}
                    </p>
                </div>

                {/* SMS Template */}
                <div>
                    <label htmlFor="sms-template" className="block text-sm font-medium text-gray-700 mb-2">
                        {__('SMS Template', 'discord-notifications-for-woocommerce')}
                        <span className="text-xs text-gray-500 ml-2">
                            {__('(Plain text only)', 'discord-notifications-for-woocommerce')}
                        </span>
                    </label>
                    <div className="relative">
                        <textarea
                            id="sms-template"
                            rows={6}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm ${!isPro ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                            placeholder={isPro ? __('Enter your custom SMS template...', 'discord-notifications-for-woocommerce') : __('Upgrade to PRO to customize SMS templates', 'discord-notifications-for-woocommerce')}
                            value={isPro ? smsTemplate : defaultSmsTemplate}
                            onChange={(e) => isPro && setSmsTemplate(e.target.value)}
                            onClick={handleTextareaClick}
                            disabled={!isPro}
                        />
                        {!isPro && (
                            <div className="absolute inset-0 bg-gray-50 bg-opacity-75 flex items-center justify-center rounded-md">
                                <div className="text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <p className="text-sm text-gray-600 font-medium">
                                        {__('PRO Feature', 'discord-notifications-for-woocommerce')}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        {__('SMS template should be concise and plain text only. No Markdown or HTML formatting.', 'discord-notifications-for-woocommerce')}
                    </p>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSaveTemplate}
                        disabled={isSaving || !isPro}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${isPro ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' : 'bg-gray-400 cursor-not-allowed'} transition-colors duration-200`}
                    >
                        {isSaving ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {__('Saving...', 'discord-notifications-for-woocommerce')}
                            </>
                        ) : (
                            __('Save Template', 'discord-notifications-for-woocommerce')
                        )}
                    </button>
                </div>

                {/* Available Template Tags */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <span className="text-xl mr-2">🏷️</span>
                        {__('Available Template Tags', 'discord-notifications-for-woocommerce')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {templateTags.map((item, index) => (
                            <div key={index} className="bg-white p-3 rounded border">
                                <code className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                    {item.tag}
                                </code>
                                <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-900 mb-2">
                            {__('Usage Tips:', 'discord-notifications-for-woocommerce')}
                        </h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• {__('Template tags will be automatically replaced with actual order data', 'discord-notifications-for-woocommerce')}</li>
                            <li>• {__('General template supports Markdown formatting for Discord, Slack, and rich text emails', 'discord-notifications-for-woocommerce')}</li>
                            <li>• {__('SMS template should be plain text only - keep it concise due to character limits', 'discord-notifications-for-woocommerce')}</li>
                            <li>• {__('Leave templates empty to use the default template for each channel', 'discord-notifications-for-woocommerce')}</li>
                            <li>• {__('SMS template is used specifically for SMS notifications, general template for all others', 'discord-notifications-for-woocommerce')}</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* PRO Modal */}
            {showProModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
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
                                    {__('Custom templates are available in the PRO version. Upgrade now to unlock this feature and many more!', 'discord-notifications-for-woocommerce')}
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
                                        className="px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 text-center"
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

export default TemplatesTab; 