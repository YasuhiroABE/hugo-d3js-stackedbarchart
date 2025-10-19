// Translation functions for the stacked ordinal ratio chart
function tr(key, lang) {
    const translations = {
        'en': {
	    'year': 'Year',
            'total': 'Total',
            'answers': 'Answers',
	    'ratio': 'Percentage',
            'selection': 'Selection'
        },
        'ja': {
	    'year': '年',
            'total': '合計',
            'answers': '回答数',
	    'ratio': '割合',
            'selection': '選択'
        }
    };
    
    return translations[lang] && translations[lang][key] ? translations[lang][key] : key;
}

// Helper function to generate ordered X arrays
function generateOrderedXArray(xValue, scale) {
    const parts = xValue.split('-');
    const base = parts.slice(0, -1).join('-');
    const lastPart = parseInt(parts[parts.length - 1]);
    
    return Array.from({length: scale}, (_, i) => `${base}-${lastPart}-${i + 1}`);
}
