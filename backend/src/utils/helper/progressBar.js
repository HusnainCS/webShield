// utils/progressBar.js

// Reusable progress bar function
export function createProgressBar(label = "Processing") {
    let progress = 0;

    const interval = setInterval(() => {
        progress = (progress + 3) % 103; // increases slowly
        const filled = Math.floor(progress / 5);
        const empty = 20 - filled;

        const bar = "█".repeat(filled) + "-".repeat(empty);

        process.stdout.write(`\r${label}: [${bar}] ${progress}%`);
    }, 200);

    return interval;
}
