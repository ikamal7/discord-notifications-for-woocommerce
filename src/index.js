import { createRoot } from '@wordpress/element';
/**
 * External dependencies
 */
import './index.css';

/**
 * Internal dependencies
 */
import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('discord-woo-notif-app');
    if (container) {
        const root = createRoot(container);
        root.render(<App />);
    }
});

