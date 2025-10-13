import React, { useState, useEffect } from 'react';

const SystemDestroyed = () => {
    const lines = [
        "ERROR 120 - PRESSURE SENSOR FAILURE",
        "ERROR 729 - CORE OVERHEATED",
        "ERROR 988 - STRUCTURAL INTEGRITY OF CORE COMPROMISED",
        "ERROR 475 - NETWORK TIMEOUT",
        "ERROR 527 - CONNECTION LOST"
    ];

    const waitTimes = [5000, 3000, 6000, 4000, 10000];

    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');

    useEffect(() => {
        if (currentLineIndex < lines.length) {
            const line = lines[currentLineIndex];
            if (currentText.length < line.length) {
                const timeout = setTimeout(() => {
                    setCurrentText(line.substring(0, currentText.length + 1));
                }, 50);
                return () => clearTimeout(timeout);
            } else {
                // Wait a bit before starting the next line
                const timeout = setTimeout(() => {
                    setDisplayedLines([line]);
                    setCurrentLineIndex(prev => prev + 1);
                    setCurrentText('');
                }, waitTimes[currentLineIndex]);
                return () => clearTimeout(timeout);
            }
        }
    }, [currentLineIndex, currentText, lines]);

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center'}}>
          <h1>
            {displayedLines.map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ))}
            {currentText}
          </h1>
        </div>
    );
}

export default SystemDestroyed;

