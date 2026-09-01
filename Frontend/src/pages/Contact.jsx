import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.post("/api/contact/send", formData);
      data.success
        ? toast.success(data.message)
        : toast.error(data.message);

      if (!data.success) return;
      // Clearing the form fields
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div class="md:py-4">
          <h2 class="text-2xl font-bold text-primary sm:text-3xl ">
            Get in touch
          </h2>

          <p class="mt-4 text-pretty text-secondary ">
            Have a question about our laptops, need help choosing the right
            device, or want to learn more about our technology solutions? Our
            team is here to help. Reach out to SmartCore Technologies and we'll
            be happy to assist you with expert guidance, product information,
            and any support you need.
          </p>

          <dl class="mt-6 space-y-3">
            <div>
              <dt class="sr-only">Phone number</dt>

              <dd class="grid grid-cols-[24px_1fr] items-center gap-2 text-secondary">
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>

                <span class="font-medium">+1 (555) 123-4567</span>
              </dd>
            </div>

            <div>
              <dt class="sr-only">Email</dt>

              <dd class="grid grid-cols-[24px_1fr] items-center gap-2 text-secondary">
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>

                <span class="font-medium">smartcorecomputers@gmail.com</span>
              </dd>
            </div>

            <div>
              <dt class="sr-only">Location</dt>

              <dd class="grid grid-cols-[24px_1fr] items-center gap-2 text-secondary">
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>

                <span class="font-medium">Nairobi, Kenya</span>
              </dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={onSubmitHandler}
          class="space-y-4 rounded-lg border border-border-color bg-card p-6"
        >
          <div>
            <label class="block text-sm font-medium text-primary" for="name">
              Name
            </label>

            <input
              class="mt-1 p-2 w-full rounded-lg focus:border  focus:border-accent focus:outline-none bg-main text-primary"
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-primary" for="email">
              Email
            </label>

            <input
              class="mt-1 p-2 w-full rounded-lg focus:border  focus:border-accent focus:outline-none bg-main text-primary"
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Your email"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-primary" for="message">
              Message
            </label>

            <textarea
              class="mt-1 p-2 w-full resize-none rounded focus:border focus:border-accent focus:outline-none bg-main text-primary"
              id="message"
              rows="4"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Your message"
              required
            ></textarea>
          </div>

          <button
            class="block w-full rounded-lg bg-accent px-12 py-3 text-sm font-medium text-primary transition-colors hover:bg-accent-hover"
            type="submit"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
