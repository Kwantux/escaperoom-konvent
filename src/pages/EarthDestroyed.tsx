import React, { useState, useEffect } from 'react';

const EarthDestroyed = () => {
    const lines = [
        "Die Erde wurde so eben von euch mit Käse überbacken.",
        "Ihr habt die Menschheit vernichtet, noch bevor Jukvubiryudu die Chance dazu hatte.",
        "Ihr habt das Spiel verloren."
    ];

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
                    setDisplayedLines(prev => [...prev, line]);
                    setCurrentLineIndex(prev => prev + 1);
                    setCurrentText('');
                }, 500);
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

export default EarthDestroyed;

