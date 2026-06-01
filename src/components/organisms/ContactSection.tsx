"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionTitle, Button, Toast, type ToastType } from "@/components/atoms";
import { FormField } from "@/components/molecules";
import { siteConfig } from "@/config/site";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

export function ContactSection() {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [toast, setToast] = useState<{
    isVisible: boolean;
    message: string;
    type: ToastType;
  }>({
    isVisible: false,
    message: "",
    type: "success",
  });

  const showToast = (message: string, type: ToastType) => {
    setToast({ isVisible: true, message, type });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate Limit Check
    const lastSent = localStorage.getItem("last_email_sent");
    const now = Date.now();
    const COOLDOWN = 60000; // 60 seconds

    if (lastSent && now - parseInt(lastSent) < COOLDOWN) {
      const remaining = Math.ceil((COOLDOWN - (now - parseInt(lastSent))) / 1000);
      showToast(
        language === "es"
          ? `Por favor espera ${remaining}s antes de enviar otro mensaje.`
          : `Please wait ${remaining}s before sending another message.`,
        "warning"
      );
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      showToast(
        language === "es"
          ? "Por favor rellena todos los campos."
          : "Please fill in all fields.",
        "warning"
      );
      return;
    }

    setIsSubmitting(true);

    const templateParams = {
      from_name: formData.name,
      to_name: process.env.NEXT_PUBLIC_EMAILJS_TO_NAME,
      message: formData.message,
      reply_to: formData.email,
    };

    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      if (response.status === 200) {
        localStorage.setItem("last_email_sent", Date.now().toString());
        showToast(
          language === "es" ? "¡Email enviado con éxito!" : "Email sent successfully!",
          "success"
        );
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      showToast(
        language === "es" ? "Error al enviar el mensaje" : "Error sending message",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 sm:py-20 relative">
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle={t.contact.subtitle} title={t.contact.title} />

        <div className="mt-8 sm:mt-12 grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <p className="text-text-secondary text-lg leading-relaxed">
              {t.contact.description}
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-xs font-mono text-text-secondary uppercase tracking-widest block mb-1">
                    {t.contact.emailLabel}
                  </span>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-primary hover:underline font-mono"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="text-xs font-mono text-text-secondary uppercase tracking-widest block mb-1">
                    {t.contact.ubicacionLabel}
                  </span>
                  <p className="text-text-primary">{t.contact.ubicacion}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-bg-card border border-border rounded-xl p-4 sm:p-6 glow-border"
          >
            <form onSubmit={sendEmail} className="space-y-2">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  label={t.contact.nombre}
                  name="name"
                  placeholder={t.contact.placeholderNombre}
                  value={formData.name}
                  onChange={handleChange}
                />
                <FormField
                  label={t.contact.email}
                  name="email"
                  type="email"
                  placeholder={t.contact.placeholderEmail}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <FormField
                label={t.contact.mensaje}
                name="message"
                type="textarea"
                placeholder={t.contact.placeholderMensaje}
                value={formData.message}
                onChange={handleChange}
              />

              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    {language === "es" ? "Enviando..." : "Sending..."}
                  </>
                ) : (
                  <>
                    {t.contact.enviar} <Send size={16} />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

