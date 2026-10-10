export function toBengaliNumber(num) {
    if (num === null || num === undefined) return "";
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num
        .toString()
        .replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

export function formatBengaliPrice(price) {
    if (price === null || price === undefined) return "০";
    const num = typeof price === "number" ? price : parseFloat(price);
    if (isNaN(num)) return price;
    const formatted = num.toLocaleString("en-IN");
    return toBengaliNumber(formatted);
}

export function getBengaliDate() {
    const date = new Date();
    const days = [
        "রবিবার",
        "সোমবার",
        "মঙ্গলবার",
        "বুধবার",
        "বৃহস্পতিবার",
        "শুক্রবার",
        "শনিবার",
    ];
    const months = [
        "জানুয়ারি",
        "ফেব্রুয়ারি",
        "মার্চ",
        "এপ্রিল",
        "মে",
        "জুন",
        "জুলাই",
        "আগস্ট",
        "সেপ্টেম্বর",
        "অক্টোবর",
        "নভেম্বর",
        "ডিসেম্বর",
    ];

    const dayName = days[date.getDay()];
    const dayNumber = toBengaliNumber(date.getDate());
    const monthName = months[date.getMonth()];
    const year = toBengaliNumber(date.getFullYear());

    return `${dayName}, ${dayNumber} ${monthName}, ${year}`;
}