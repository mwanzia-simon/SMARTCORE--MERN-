import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Mail,
  Phone,
} from "lucide-react";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Browse our products, add your preferred laptop to your cart, proceed to checkout, and complete your payment.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "SmartCore currently accepts M-Pesa and Cash on Delivery (where available). Additional payment methods may be introduced in the future.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Yes. Orders can be cancelled before they are processed or shipped. Contact our support team as soon as possible.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery typically takes between 1–5 business days depending on your location and product availability.",
  },
  {
    question: "Can I return a laptop?",
    answer:
      "Yes. Eligible products can be returned within our return policy period provided they meet our return requirements.",
  },
  {
    question: "Do I need an account to place an order?",
    answer:
      "Yes. Creating an account allows you to securely manage your orders, addresses, and purchase history.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is confirmed, you can monitor its progress from the 'My Orders' section in your account.",
  },
  {
    question: "How do I contact SmartCore?",
    answer:
      "You can reach us through our Contact page or email our customer support team for assistance.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen bg-main">

      {/* Hero */}
      <section className="bg-main text-primary">
        <div className="mx-auto max-w-5xl px-6 py-10 text-center">

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
            <HelpCircle size={32} />
          </div>

          <h1 className="text-3xl font-bold md:text-4xl">
            Frequently Asked Questions
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-muted">
            Find answers to the most common questions about SmartCore,
            orders, payments, delivery, and your account.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-6">

        <div className="space-y-4">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-border-color bg-card shadow-sm"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-main"
              >
                <span className="text-lg font-semibold text-primary">
                  {faq.question}
                </span>

                {openIndex === index ? (
                  <ChevronUp className="text-primary" />
                ) : (
                  <ChevronDown className="text-primary" />
                )}
              </button>

              {openIndex === index && (
                <div className="border-t border-border-color px-6 py-5 text-secondary">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}

        </div>

      </section>

      {/* Contact Card */}
      <section className="pb-16">
        <div className="mx-auto max-w-4xl px-6">

          <div className="rounded-3xl bg-card p-10 text-center text-white">

            <h2 className="text-3xl font-bold">
              Still Need Help?
            </h2>

            <p className="mt-3 text-muted">
              If you couldn't find the answer you're looking for,
              our support team is ready to assist you.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

              <button className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:bg-gray-200">
                <Mail size={18} />
                Contact Support
              </button>

              <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-600 px-6 py-3 transition hover:bg-white/10">
                <Phone size={18} />
                Call Us
              </button>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default FAQ;