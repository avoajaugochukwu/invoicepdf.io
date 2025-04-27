import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Site Title/Logo */}
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* You can replace this with an SVG logo or an Image component */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6" // Simple placeholder icon
            >
              <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
            </svg>
            <span className="font-bold inline-block">My Site</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-4 text-sm lg:gap-6 flex-grow">
          <Link
            href="/"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="transition-colors hover:text-foreground/80 text-foreground" // Example: Highlight current section
          >
            Blog
          </Link>
          {/* Add other links like "/about", "/contact" here */}
        </nav>

        {/* Optional: Right-aligned items (e.g., Theme Toggle, Auth Button) */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Example: Add a theme toggle or login button here */}
          {/* <ThemeToggle /> */}
          {/* <Button variant="outline" size="sm">Login</Button> */}
        </div>
      </div>
    </header>
  );
} 