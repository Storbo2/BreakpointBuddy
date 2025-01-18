import React, { useState, useEffect } from 'react';
import '../styles/queryBox.css';

const QueryBox = () => {
    const [position, setPosition] = useState({ top: 'calc(100% - 140px)', left: 'calc(100% - 140px)' });
    const [styles, setStyles] = useState({ backgroundColor: '#00bfff', textColor: '#000', size: 130 });
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [breakpoint, setBreakpoint] = useState('lg');
    const [visible, setVisible] = useState(true);
    const [showOptions, setShowOptions] = useState(false);

    const margin = 10;

    const handleDragEnd = (e) => {
        const { clientX, clientY } = e.type === 'touchend' ? e.changedTouches[0] : e;
        const width = window.innerWidth;
        const height = window.innerHeight;

        let newPosition = {};

        if (clientX < width / 2 && clientY < height / 2) {
            newPosition = { top: `${margin}px`, left: `${margin}px` }; // Cuadrante 1
        } else if (clientX >= width / 2 && clientY < height / 2) {
            newPosition = { top: `${margin}px`, left: `calc(100% - ${styles.size + margin}px)` }; // Cuadrante 2
        } else if (clientX < width / 2 && clientY >= height / 2) {
            newPosition = { top: `calc(100% - ${styles.size + margin}px)`, left: `${margin}px` }; // Cuadrante 3
        } else {
            newPosition = { top: `calc(100% - ${styles.size + margin}px)`, left: `calc(100% - ${styles.size + margin}px)` }; // Cuadrante 4
        }
        setPosition(newPosition);
    };

    const changeSize = (delta) => {
        setStyles((prev) => {
            const newSize = Math.max(100, Math.min(200, prev.size + delta));
            return { ...prev, size: newSize };
        });
    };

    const toggleOptions = () => {
        setShowOptions((prev) => !prev);
    };

    return visible ? (
        <>
            <div
                className="query-box"
                style={{
                    top: position.top,
                    left: position.left,
                    width: `${styles.size}px`,
                    height: `${styles.size}px`,
                    backgroundColor: styles.backgroundColor,
                    color: styles.textColor,
                }}
                draggable
                onDragEnd={handleDragEnd}
                onTouchEnd={handleDragEnd}
            >
                <div className="breakpoint" style={{ fontSize: `${styles.size / 4}px` }}>
                    {breakpoint}
                </div>
                <div className="dimensions" style={{ fontSize: `${styles.size / 8}px` }}>
                    {dimensions.width}×{dimensions.height}
                </div>
            </div>
            <div
                className="settings-icon"
                style={{
                    top: position.top,
                    left: position.left.includes('calc') ? `calc(${position.left} - 30px)` : `${styles.size + margin}px`,
                }}
                onClick={toggleOptions}
            >
                ⚙️
            </div>
            {showOptions && (
                <div className="settings-options">
                    <div onClick={() => changeSize(10)}>➕</div>
                    <div onClick={() => changeSize(-10)}>➖</div>
                    <div>
                        🎨 <input type="color" onChange={(e) => setStyles({ ...styles, backgroundColor: e.target.value })} />
                    </div>
                    <div>
                        ✏️ <input type="color" onChange={(e) => setStyles({ ...styles, textColor: e.target.value })} />
                    </div>
                    <div onClick={() => setVisible(false)}>🚫</div>
                </div>
            )}
        </>
    ) : null;
};

export default QueryBox;