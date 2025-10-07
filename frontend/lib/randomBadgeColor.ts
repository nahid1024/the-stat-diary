const badgeColors = [
    "bg-red-100 text-red-700",
    "bg-green-100 text-green-700",
    "bg-blue-100 text-blue-700",
    "bg-yellow-100 text-yellow-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
    "bg-teal-100 text-teal-700",
];

// Function to get a random color
export const getRandomColor = () =>
    badgeColors[Math.floor(Math.random() * badgeColors.length)];