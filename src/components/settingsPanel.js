import React, { useState } from 'react';

const SettingsPanel = ({ onChange }) => {
    const [color, setColor] = useState('#f0f0f0');
    const [size, setSize] = useState('1.5rem');

    const handleApply = () => {
        onChange({ color, size });
    };

    return (
        <div className="settings-panel">
            <label>
                Background Color:
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
            </label>
            <label>
                Font Size:
                <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                />
            </label>
            <button onClick={handleApply}>Apply</button>
        </div>
    );
};

export default SettingsPanel;