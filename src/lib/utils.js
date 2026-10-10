export function toBengaliNumber(num) {
    if (num === null || num === undefined || num === "") return "০";
    const str = String(num);
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return str.replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

export function parseNumericValue(val) {
    if (typeof val === "number") return val;
    if (!val) return 0;
    const bengaliToEnglish = {
        "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4",
        "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
    };
    const englishStr = String(val).replace(/[০-৯]/g, (d) => bengaliToEnglish[d] || d);
    const cleanStr = englishStr.replace(/[^0-9.-]/g, "");
    const num = parseFloat(cleanStr);
    return isNaN(num) ? 0 : num;
}

export function formatBengaliPrice(price) {
    const num = parseNumericValue(price);
    const formatted = num.toLocaleString("en-IN");
    return toBengaliNumber(formatted);
}

export function getBengaliDate() {
    const date = new Date();
    const days = [
        "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার",
        "বৃহস্পতিবার", "শুক্রবার", "শনিবার",
    ];
    const months = [
        "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল",
        "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর",
        "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
    ];

    const dayName = days[date.getDay()];
    const dayNumber = toBengaliNumber(date.getDate());
    const monthName = months[date.getMonth()];
    const year = toBengaliNumber(date.getFullYear());

    return `${dayName}, ${dayNumber} ${monthName}, ${year}`;
}