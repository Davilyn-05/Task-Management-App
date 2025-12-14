const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="text-center py-3 md:py-4 mt-auto shadow-lg bg-gray-800 text-gray-300">
      <p className="text-xs md:text-sm">BSIT 3-4</p>
    </footer>
  );
}

export default Footer;
