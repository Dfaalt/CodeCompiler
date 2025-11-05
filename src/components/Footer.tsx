const Footer = () => {
  return (
    <footer className="border-border bg-card shrink-0 border-t py-3 sm:py-4">
      <div className="text-muted-foreground container mx-auto px-3 text-center text-xs sm:px-4 sm:text-sm">
        © {new Date().getFullYear()} Dfaalt Code Compiler. Supports
        JavaScript, TypeScript, Python, C++, Java, and HTML/CSS.
      </div>
    </footer>
  );
};

export default Footer;
