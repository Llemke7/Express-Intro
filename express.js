const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Express.js server is running.');
});


// Function to calculate mean
function calculateMean(nums) {
    const numbers = nums.map(Number);
    if (numbers.some(isNaN)) {
        throw new Error('Invalid number(s) provided.');
    }
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / nums.length;
}

// Function to calculate median
function calculateMedian(nums) {
    const numbers = nums.map(Number).sort((a, b) => a - b);
    const middleIndex = Math.floor(nums.length / 2);
    if (numbers.some(isNaN)) {
        throw new Error('Invalid number(s) provided.');
    }
    if (numbers.length % 2 === 0) {
        return (numbers[middleIndex - 1] + numbers[middleIndex]) / 2;
    } else {
        return numbers[middleIndex];
    }
}

// Function to calculate mode
function calculateMode(nums) {
    const numbers = nums.map(Number);
    if (numbers.some(isNaN)) {
        throw new Error('Invalid number(s) provided.');
    }
    const freqMap = {};
    numbers.forEach(num => {
        freqMap[num] = (freqMap[num] || 0) + 1;
    });
    let maxFreq = 0;
    let modes = [];
    for (const num in freqMap) {
        const freq = freqMap[num];
        if (freq > maxFreq) {
            maxFreq = freq;
            modes = [num];
        } else if (freq === maxFreq) {
            modes.push(num);
        }
    }
    return modes.map(Number);
}

// Express routes
app.get('/mean', (req, res) => {
    const { nums } = req.query;
    if (!nums) {
        return res.status(400).json({ error: 'nums are required.' });
    }
    try {
        const mean = calculateMean(nums.split(','));
        res.json({ operation: 'mean', value: mean });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/median', (req, res) => {
    const { nums } = req.query;
    if (!nums) {
        return res.status(400).json({ error: 'nums are required.' });
    }
    try {
        const median = calculateMedian(nums.split(','));
        res.json({ operation: 'median', value: median });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/mode', (req, res) => {
    const { nums } = req.query;
    if (!nums) {
        return res.status(400).json({ error: 'nums are required.' });
    }
    try {
        const mode = calculateMode(nums.split(','));
        res.json({ operation: 'mode', value: mode });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/favicon.ico', (req, res) => res.status(204));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

