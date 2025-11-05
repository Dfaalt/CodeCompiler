const Footer = () => {
  return (
    <footer className="border-border bg-card shrink-0 border-t py-3 sm:py-4">
      <div className="text-muted-foreground container mx-auto px-3 text-center text-xs sm:px-4 sm:text-sm">
        © {new Date().getFullYear()}
        <a
          href="https://www.linkedin.com/in/ilham-maulana1101"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent/80 mx-1 font-semibold transition-colors hover:underline"
        >
          Dfaalt
        </a>
        Code Compiler. Supports JavaScript, TypeScript, Python, C++, Java, and
        HTML/CSS.
      </div>
    </footer>
  );
};

export default Footer;
