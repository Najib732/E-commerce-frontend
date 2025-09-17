export default function MyFooter() {
  return (
    <footer className="bg-gray-200 text-gray-700 py-4 w-full rounded-lg shadow-inner">
      <p className="mb-2 text-center font-medium">Contact Us:</p>
      <div className="flex justify-center space-x-4 mb-2">
        <a href="mailto:contact@internwave.com" className="hover:underline">
          Email
        </a>
        <a href="https://www.linkedin.com/in/yourprofile" target="_blank" className="hover:underline">
          LinkedIn
        </a>
        <a href="https://github.com/yourprofile" target="_blank" className="hover:underline">
          GitHub
        </a>
        <a href="https://twitter.com/yourprofile" target="_blank" className="hover:underline">
          Twitter
        </a>
      </div>
      <p className="text-sm text-center">&copy; {new Date().getFullYear()} InternWave</p>
    </footer>
  );
}
