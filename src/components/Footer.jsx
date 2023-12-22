const Footer = () => {
  return (
    <footer className="bg-white border-t-2">
      <div className="max-w-screen-xl flex flex-col items-center justify-between px-6 py-8 mx-auto lg:flex-row">
        <a className="text-lg font-semibold" href="/">
          Task Sync Pro
        </a>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 lg:gap-6 lg:mt-0">
          <a
            href="#"
            className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500"
          >
            Overview
          </a>

          <a
            href="#"
            className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500"
          >
            Features
          </a>

          <a
            href="#"
            className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500"
          >
            Careers
          </a>

          <a
            href="#"
            className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500"
          >
            Help
          </a>

          <a
            href="#"
            className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500"
          >
            Privacy
          </a>
        </div>

        <p className="mt-6 text-sm text-gray-500 lg:mt-0 dark:text-gray-400">
          © Copyright 2023 Task Sync Pro.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
