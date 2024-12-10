const loadPreferences = () => {
    const theme = JSON.parse(localStorage.getItem('theme')) || {};

   
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (theme.isDarkMode) {
        document.documentElement.style.setProperty('--bg-color', 'var(--bg-color-dark)');
        document.documentElement.style.setProperty('--text-color', 'var(--text-color-dark)');
        document.documentElement.style.setProperty('--accent-color', 'var(--accent-color-dark)');
        darkModeToggle.checked = true;
    }

    
    if (theme.customColors) {
        for (const [key, value] of Object.entries(theme.customColors)) {
            document.documentElement.style.setProperty(`--${key}`, value);
        }
    }
};


const savePreferences = (isDarkMode, customColors) => {
    localStorage.setItem('theme', JSON.stringify({
        isDarkMode,
        customColors,
    }));
};


document.getElementById('darkModeToggle').addEventListener('change', (e) => {
    const isDarkMode = e.target.checked;

    if (isDarkMode) {
        document.documentElement.style.setProperty('--bg-color', 'var(--bg-color-dark)');
        document.documentElement.style.setProperty('--text-color', 'var(--text-color-dark)');
        document.documentElement.style.setProperty('--accent-color', 'var(--accent-color-dark)');
    } else {
        document.documentElement.style.setProperty('--bg-color', 'var(--bg-color-light)');
        document.documentElement.style.setProperty('--text-color', 'var(--text-color-light)');
        document.documentElement.style.setProperty('--accent-color', 'var(--accent-color-light)');
    }

    savePreferences(isDarkMode, null);
});

const colorPickers = {
    textColorPicker: 'text-color',
    bgColorPicker: 'bg-color',
    accentColorPicker: 'accent-color',
};

Object.keys(colorPickers).forEach(pickerId => {
    document.getElementById(pickerId).addEventListener('input', (e) => {
        const colorVariable = colorPickers[pickerId];
        document.documentElement.style.setProperty(`--${colorVariable}`, e.target.value);

        const customColors = Object.fromEntries(
            Object.keys(colorPickers).map(pickerId => [
                colorPickers[pickerId],
                document.getElementById(pickerId).value
            ])
        );

        const isDarkMode = document.getElementById('darkModeToggle').checked;
        savePreferences(isDarkMode, customColors);
    });
});
loadPreferences();