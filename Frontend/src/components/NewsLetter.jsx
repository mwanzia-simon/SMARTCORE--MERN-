import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribeToNewsletter = async () => {
    try {
      const { data } = await api.post("/api/newsletter/subscribe", { email });

      data.success ? toast.success(data.message) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="flex flex-col items-center text-primary">
      <div className="flex flex-col items-center">
        <h2 className="text-center text-4xl font-semibold max-w-2xl">
          Subscribe{" "}
          <span className="bg-gradient-to-t from-accent to-black p-1 bg-left inline-block bg-no-repeat">
            newsletter
          </span>
        </h2>
        <p className="text-center text-muted max-w-lg mt-3">
          A visual collection of our most recent works - each piece crafted with
          intention, emotion, and style.
        </p>
      </div>
      <div className="flex items-center justify-center mt-10 border border-slate-700 focus-within:outline focus-within:outline-accent text-sm rounded-full h-14 max-w-xl w-full">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent outline-none rounded-full px-4 h-full flex-1 placeholder:text-slate-400"
          placeholder="Enter your email address"
          type="text"
        />
        <button
          onClick={handleSubscribeToNewsletter}
          className="bg-accent text-white rounded-full h-11 mr-1 px-10 flex items-center justify-center hover:bg-accent-hover active:scale-95 transition"
        >
          Subscribe
        </button>
      </div>
    </section>
  );
};

export default NewsLetter;
