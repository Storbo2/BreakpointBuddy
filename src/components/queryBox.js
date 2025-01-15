import React, { useState, useEffect } from 'react';
import '../styles/queryBox.css';

const QueryBox = () => {
    const [position, setPosition] = useState({ top: 'calc(100% - 120px)', left: 'calc(100% - 220px)' });
    const [styles, setStyles] = useState({ color: '#00bfff', fontSize: '1.5rem' });
    const [visible, setVisible] = useState(true);
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [breakpoint, setBreakpoint] = useState('lg');

    const handleDragEnd = (e) => {
        const { clientX, clientY } = e;
        const width = window.innerWidth;
        const height = window.innerHeight;

        const newPosition = {
            top: Math.max(0, Math.min(clientY, height - 120)) + 'px',
            left: Math.max(0, Math.min(clientX, width - 220)) + 'px',
        };
        setPosition(newPosition);
    };

    useEffect(() => {
        const updateDimensions = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setDimensions({ width, height });

            if (width <= 599) setBreakpoint('xs');
            else if (width <= 767) setBreakpoint('sm');
            else if (width <= 1023) setBreakpoint('md');
            else if (width <= 1279) setBreakpoint('lg');
            else if (width <= 1535) setBreakpoint('xl');
            else setBreakpoint('2xl');
        };

        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return visible ? (
        <>
            <div
                className="query-box"
                style={{
                    ...position,
                    backgroundColor: styles.color,
                    fontSize: styles.fontSize,
                }}
                draggable
                onDragEnd={handleDragEnd}
            >
                <p>
                    [{breakpoint}] {dimensions.width}px x {dimensions.height}px
                </p>
                <button className="close-button" onClick={() => setVisible(false)}>
                    ✖
                </button>
            </div>
            <div className="controls">
                <div className="icon" onClick={() => document.getElementById('color-picker').click()}>
                    🎨
                </div>
                <input
                    id="color-picker"
                    type="color"
                    value={styles.color}
                    onChange={(e) => setStyles({ ...styles, color: e.target.value })}
                    style={{ display: 'none' }}
                />
                <div className="card" onClick={() => setStyles({ ...styles, fontSize: `${parseFloat(styles.fontSize) + 0.1}rem` })}>
                    +
                </div>
                <div className="card" onClick={() => setStyles({ ...styles, fontSize: `${Math.max(0.5, parseFloat(styles.fontSize) - 0.1)}rem` })}>
                    -
                </div>
            </div>
        </>
    ) : null;
};

export default QueryBox;