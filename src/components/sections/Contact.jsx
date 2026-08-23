import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import TitleHeader from '../TitleHeader.jsx';
import ContactVisual from "../ContactVisual.jsx";

const Contact = () => {
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading state

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
            );

            // Reset form and stop loading
            setForm({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("EmailJS Error:", error); // Optional: show toast
        } finally {
            setLoading(false); // Always stop loading, even on error
        }
    };

    return (
        <section id="contact" className="flex-center section-padding pt-32 pb-20">
            <div className="w-full h-full max-w-7xl mx-auto md:px-10 px-5">
                <TitleHeader
                    title="Get in Touch – Let’s Connect"
                    sub="💬 Have questions or ideas? Let’s talk! 🚀"
                />
                <div className="grid-12-cols mt-16 md:mt-24">
                    <div className="xl:col-span-5">
                        <div className="glass-2 border border-white/5 rounded-3xl p-8 md:p-10 flex-center">
                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="w-full flex flex-col gap-6"
                            >
                                <div>
                                    <label htmlFor="name" className="block text-zinc-300 font-medium mb-2">Your name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="What’s your good name?"
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[var(--color-accent)]/60 focus:bg-black/60 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-zinc-300 font-medium mb-2">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="What’s your email address?"
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[var(--color-accent)]/60 focus:bg-black/60 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-zinc-300 font-medium mb-2">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="How can I help you?"
                                        rows="5"
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[var(--color-accent)]/60 focus:bg-black/60 transition-colors resize-none"
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl glass-3 border border-white/5 text-white font-medium transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:border-[var(--color-accent)]/50 mt-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    {loading ? "Sending..." : "Send Message"}
                                    {!loading && <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>}
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="xl:col-span-7 min-h-[400px]">
                        <div className="w-full h-full p-2 rounded-3xl overflow-hidden glass-2 border border-white/5 relative">
                            <ContactVisual />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
