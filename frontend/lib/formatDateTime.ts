export default function formatDateTime(dateString: string): string {
    const date = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(dateString));
    return date;
}