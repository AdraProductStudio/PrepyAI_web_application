// export function CalculateTestTime(targetTime) {
//     const difference = new Date(targetTime) - new Date();
//     if (difference > 0) {
//         const minutes = Math.floor((difference / (1000 * 60)) % 60);
//         const seconds = Math.floor((difference / 1000) % 60);
//         return { minutes, seconds };
//     } else {
//         return null;
//     }
// }

export function CalculateTestTime(targetTime) {
    const difference = new Date(targetTime) - new Date();
    if (difference > 0) {
        const totalSeconds = Math.floor(difference / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return { hours, minutes, seconds };
    } else {
        return null;
    }
}