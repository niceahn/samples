import {forKeyCode} from '@enact/core/handle';
import {configure} from '@enact/analytics';
import React from 'react';
import {render} from 'react-dom';

import App from './App';

// All configure properties are optional and can be used
// to customize what is being detected, how the log entry
// is being formatted, and where to log the entries.
configure({
	enabled: true,

	// A target selector for events
	selector: '.spottable',

	// Example of adding optional custom listeners
	// Could alternatively use a simple string array of events
	// when not needing any custom filters/adapters
	listeners: {
		keydown: {
			// Filter to only listen for space key
			filter: forKeyCode(32),
			// Adapter to add additional properties to message payload.
			adapter: () => ({spaceKey: true})
		}
	},

	// eslint-disable-next-line
	log: console.table,

	entries: [
		{
			data: {
				// add the panel key to the message payload by finding the first <h1> descendant
				// within the nearest <article> ancestor and returning its text content.
				panel: {
					closest: 'article',
					value: {
						selector: 'h1',
						value: '<text>'
					}
				}
			}
		}
	]
});

const appElement = (<App />);

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	render(appElement, document.getElementById('root'));
}

export default appElement;
