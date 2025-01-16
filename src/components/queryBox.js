import React, { useState, useEffect } from 'react';
import '../styles/queryBox.css';

const QueryBox = () => {
    const [position, setPosition] = useState({ top: 'calc(100% - 130px)', left: 'calc(100% - 130px)' });
    const [styles, setStyles] = useState({ color: '#00bfff', size: 130 });
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [breakpoint, setBreakpoint] = useState('lg');
    const [visible, setVisible] = useState(true);

    const handleDragEnd = (e) => {
        const { clientX, clientY } = e;
        const width = window.innerWidth;
        const height = window.innerHeight;

        let newPosition = {};
        const margin = 10;

        if (clientX < width / 2 && clientY < height / 2) {
            newPosition = { top: `${margin}px`, left: `${margin}px` };
        } else if (clientX >= width / 2 && clientY < height / 2) {
            newPosition = { top: `${margin}px`, left: `calc(100% - ${styles.size + margin}px)` };
        } else if (clientX < width / 2 && clientY >= height / 2) {
            newPosition = { top: `calc(100% - ${styles.size + margin}px)`, left: `${margin}px` };
        } else {
            newPosition = { top: `calc(100% - ${styles.size + margin}px)`, left: `calc(100% - ${styles.size + margin}px)` };
        }
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

    const changeSize = (delta) => {
        setStyles((prev) => {
            const newSize = Math.max(100, Math.min(200, prev.size + delta));
            return { ...prev, size: newSize };
        });
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
                    backgroundColor: styles.color,
                }}
                draggable
                onDragEnd={handleDragEnd}
            >
                <div className="close-button" onClick={() => setVisible(false)}>
                    ✖
                </div>
                <div className="breakpoint" style={{ fontSize: `${styles.size / 4}px` }}>
                    {breakpoint}
                </div>
                <div className="dimensions" style={{ fontSize: `${styles.size / 8}px` }}>
                    {dimensions.width}×{dimensions.height}
                </div>
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
                <div className="card" onClick={() => changeSize(10)}>+</div>
                <div className="card" onClick={() => changeSize(-10)}>-</div>
            </div>
        </>
    ) : null;
};

export default QueryBox;