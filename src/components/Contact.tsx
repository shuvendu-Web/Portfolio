import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon, TwitterIcon, WhatsappIcon, TelegramIcon } from "@/components/ui/SocialIcons";
import { Mail, Send, CheckCircle2, Copy, MessageSquare, PhoneCall, Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobRole: "Full-time",
    subject: "",
    message: "",
  });
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    phone: string;
    jobRole: string;
    subject: string;
    message: string;
  } | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const currentData = { ...formData };

    try {
      const response = await fetch("https://formsubmit.co/ajax/shuvendu.dhenki@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          "Full Name": currentData.name,
          "Email Address": currentData.email,
          "Contact Number": currentData.phone,
          "Job Role Option": currentData.jobRole,
          "Subject": currentData.subject,
          "Message": currentData.message,
          _subject: `New Inquiry: ${currentData.subject} (${currentData.jobRole})`,
          _template: "table",
        }),
      });

      if (response.ok) {
        setSubmittedData(currentData);
        setSubmitted(true);
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#99C2FF", "#FF84BA", "#FFDF82", "#A7F3D0"],
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          jobRole: "Full-time",
          subject: "",
          message: "",
        });
      } else {
        setErrorMsg("Failed to send message. Please try again or email directly.");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setErrorMsg("Something went wrong. Please check your network or try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#f0f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-badge clay-pink text-[#701a40] text-xs font-black tracking-wider uppercase mb-2">
            <MessageSquare className="w-4 h-4 text-[#701a40]" />
            <span>Get In Touch</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight clay-headline-multicolor">
            Contact Shuvendu Dhenki — UI/UX & Web Designer
          </h2>
          <p className="text-base sm:text-lg font-medium text-slate-600">
            Have a website design, UI/UX project, or mobile app design project in mind? Get in touch directly with Shuvendu Dhenki.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="clay-card clay-cyan p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl clay-badge clay-blue flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6 text-[#0f2b66]" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-950">Direct Contact</h3>
                  <p className="text-xs font-bold text-slate-700">Fast response guaranteed within 24 hours</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-4 rounded-2xl bg-white/80 border border-white flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl clay-badge clay-blue flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#0f2b66]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-black">
                      Email Address
                    </span>
                    <span className="text-xs sm:text-sm font-black text-slate-900">
                      {PORTFOLIO_DATA.personal.email}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-full clay-badge bg-white text-slate-800 cursor-pointer shadow-sm"
                  title="Copy Email to Clipboard"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone, Call, WhatsApp & Telegram Card */}
              <div className="p-4 rounded-2xl bg-white/80 border border-white flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl clay-badge clay-mint flex items-center justify-center">
                    <PhoneCall className="w-5 h-5 text-[#114b25]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-black">
                      Phone, Call & Socials
                    </span>
                    <span className="text-xs sm:text-sm font-black text-slate-900">
                      {PORTFOLIO_DATA.personal.phone}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${PORTFOLIO_DATA.personal.phone}`}
                    className="p-2.5 rounded-full clay-badge clay-yellow cursor-pointer hover:scale-105 transition-transform"
                    title="Call Phone Number"
                  >
                    <PhoneCall className="w-4 h-4 text-[#713f12]" />
                  </a>
                  <a
                    href={PORTFOLIO_DATA.personal.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full clay-badge clay-cyan cursor-pointer hover:scale-105 transition-transform"
                    title="Chat on Telegram"
                  >
                    <TelegramIcon className="w-4 h-4 text-[#0e4555]" />
                  </a>
                  <a
                    href={PORTFOLIO_DATA.personal.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full clay-badge clay-mint cursor-pointer hover:scale-105 transition-transform"
                    title="Chat on WhatsApp"
                  >
                    <WhatsappIcon className="w-4 h-4 text-[#114b25]" />
                  </a>
                </div>
              </div>

              {/* Social Handles */}
              <div className="space-y-3">
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                  Connect on Socials
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { icon: TelegramIcon, href: PORTFOLIO_DATA.personal.telegramUrl, label: "Telegram", clay: "clay-cyan" },
                    { icon: GithubIcon, href: PORTFOLIO_DATA.personal.github, label: "GitHub", clay: "clay-peach" },
                    { icon: LinkedinIcon, href: PORTFOLIO_DATA.personal.linkedin, label: "LinkedIn", clay: "clay-blue" },
                    { icon: TwitterIcon, href: PORTFOLIO_DATA.personal.twitter, label: "Twitter", clay: "clay-mint" },
                  ].map((social, idx) => {
                    const IconC = social.icon;
                    return (
                      <a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`py-2.5 px-3 rounded-full clay-badge ${social.clay} flex items-center justify-center gap-2 text-xs font-black shadow-xs`}
                      >
                        <IconC className="w-4 h-4" />
                        <span>{social.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 rounded-2xl clay-badge clay-mint text-xs text-[#114b25] font-black flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Average response time: &lt; 4 hours</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 clay-card clay-peach">
              {submitted && submittedData ? (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 rounded-full clay-badge clay-mint flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-7 h-7 text-[#114b25]" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 font-semibold max-w-md mx-auto">
                      All details below have been formatted in a table and emailed to <strong className="text-slate-950">shuvendu.dhenki@gmail.com</strong>.
                    </p>
                  </div>

                  {/* Submitted Information Table */}
                  <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/95 shadow-xs">
                    <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between">
                      <span className="text-xs font-black tracking-wider uppercase flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-sky-400" />
                        <span>Submitted Inquiry Summary</span>
                      </span>
                      <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                        Sent to Mail
                      </span>
                    </div>

                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <tbody className="divide-y divide-slate-100 text-slate-800">
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-3 px-4 font-black text-slate-600 bg-slate-50/80 w-1/3 border-r border-slate-100">
                            Full Name
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-900">
                            {submittedData.name}
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-3 px-4 font-black text-slate-600 bg-slate-50/80 border-r border-slate-100">
                            Email Address
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">
                            {submittedData.email}
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-3 px-4 font-black text-slate-600 bg-slate-50/80 border-r border-slate-100">
                            Contact Number
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">
                            {submittedData.phone}
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-3 px-4 font-black text-slate-600 bg-slate-50/80 border-r border-slate-100">
                            Job Role Option
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-block px-3 py-1 rounded-full clay-badge clay-blue text-xs font-black text-[#0f2b66]">
                              {submittedData.jobRole}
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-3 px-4 font-black text-slate-600 bg-slate-50/80 border-r border-slate-100">
                            Subject
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-900">
                            {submittedData.subject}
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-3 px-4 font-black text-slate-600 bg-slate-50/80 border-r border-slate-100 align-top">
                            Message
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-800 whitespace-pre-wrap leading-relaxed">
                            {submittedData.message}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setSubmittedData(null);
                      }}
                      className="px-6 py-3 rounded-full text-xs font-black clay-badge clay-blue clay-button-active text-[#0f2b66] cursor-pointer inline-flex items-center gap-2 shadow-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Send Another Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-white text-sm text-slate-900 placeholder-slate-400 font-semibold shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-white text-sm text-slate-900 placeholder-slate-400 font-semibold shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98045 23216"
                        className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-white text-sm text-slate-900 placeholder-slate-400 font-semibold shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                        Job Role Option
                      </label>
                      <select
                        required
                        value={formData.jobRole}
                        onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-white text-sm text-slate-900 font-semibold shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project Inquiry / Job Opportunity"
                      className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-white text-sm text-slate-900 placeholder-slate-400 font-semibold shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project or opportunity..."
                      className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-white text-sm text-slate-900 placeholder-slate-400 font-semibold shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-3.5 rounded-2xl bg-red-100/90 border border-red-200 text-red-700 text-xs font-bold text-center">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full text-sm font-black clay-badge clay-blue clay-button-active text-[#0f2b66] cursor-pointer flex items-center justify-center gap-2 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;


