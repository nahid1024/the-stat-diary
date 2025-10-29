export default function formatDateTime(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long", // shows "October 5, 2025"
  }).format(new Date(dateString));
}