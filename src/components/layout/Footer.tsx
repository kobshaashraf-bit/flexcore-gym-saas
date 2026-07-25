export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-4 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} FlexCore. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="transition-colors hover:text-foreground">
            Privacy Policy
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Terms of Service
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Support
          </a>
          <span className="hidden sm:inline">v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}
