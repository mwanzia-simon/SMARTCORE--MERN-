// import { footerLinks } from "../assets/assets";

const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home",  "Offers & Deals", "Contact Us", "FAQs"],
    },
    {
      title: "Need Help?",
      links: [
        "Delivery Information",
        "Return & Refund Policy",
        "Payment Methods",
        "Track your Order",
        "Contact Us",
      ],
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Twitter", "Facebook", "YouTube"],
    },
  ];

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-card/50">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-border-color text-primary">
        <div>
          <h1 className="text-xl font-semibold">
            🧑‍💻
            Smart
            <span className="text-accent">Core</span>
          </h1>
          <p className="max-w-[410px] mt-6">
          Experience the perfect blend of speed, power, and reliability with our carefully selected range of premium laptops
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-secondary md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href={"/"} className="hover:underline transition text-muted">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-primary">
        Copyright {new Date().getFullYear()} © Unlisted Code Logic All Right
        Reserved.
      </p>
    </div>
  );
};

export default Footer;
