import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState("about");
  const { t } = useLanguage();

  const sections = [
    { id: "about", label: t("aboutSideAbout") },
    { id: "shipping", label: t("aboutSideShipping") },
    { id: "contact", label: t("aboutSideContact") },
    { id: "faqs", label: t("aboutSideFaqs") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-[280px_1fr] gap-12">
          <aside className="bg-card rounded-2xl p-6 h-fit shadow-card">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button key={section.id} onClick={() => setActiveSection(section.id)} className={`w-full text-start px-4 py-3 rounded-lg transition-all duration-300 font-medium ${activeSection === section.id ? "text-primary bg-primary/10" : "text-foreground/80 hover:text-primary hover:bg-muted"}`}>
                  {section.label}
                </button>
              ))}
            </nav>
          </aside>

          <div className="animate-fade-in">
            {activeSection === "about" && (
              <div className="space-y-8">
                <h1 className="text-4xl font-bold text-foreground">{t("aboutUsTitle")}</h1>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed">{t("aboutUsDesc1")}</p>
                  <p className="text-lg leading-relaxed">{t("aboutUsDesc2")}</p>
                  <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">{t("ourMission")}</h3>
                  <p className="text-lg leading-relaxed">{t("ourMissionDesc")}</p>
                </div>
              </div>
            )}

            {activeSection === "shipping" && (
              <div className="space-y-8">
                <h1 className="text-4xl font-bold text-foreground">{t("shipping")}</h1>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="domestic" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">{t("domesticShipping")}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      <p>We offer free standard shipping on all orders over $50. Standard shipping typically takes 3-5 business days.</p>
                      <p className="mt-2">Express shipping is available for an additional fee and delivers within 1-2 business days.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="international" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">{t("internationalShipping")}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      <p>We're pleased to offer international shipping via BorderGuru. International shipping and import fees including customs duties, taxes and fees are calculated at check-out.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="restriction" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">{t("shippingRestriction")}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      <p>Some products may have shipping restrictions due to their ingredients or size.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <h1 className="text-4xl font-bold text-foreground pt-8">{t("returns")}</h1>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="policy" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">{t("returnPolicy")}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">We accept returns within 30 days of purchase for unused, unopened products in their original packaging.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="how-to" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">{t("howToReturn")}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">To initiate a return, please contact our customer service team with your order number.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="refunds" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">{t("refunds")}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">Once we receive your return, we will process your refund within 5-7 business days.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            {activeSection === "contact" && (
              <div className="space-y-8">
                <h1 className="text-4xl font-bold text-foreground">{t("aboutSideContact")}</h1>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div><h3 className="text-xl font-semibold text-foreground mb-2">{t("email")}</h3><p className="text-muted-foreground">support@evacosmetics.com</p></div>
                    <div><h3 className="text-xl font-semibold text-foreground mb-2">{t("phone")}</h3><p className="text-muted-foreground">+1 (555) 123-4567</p></div>
                    <div><h3 className="text-xl font-semibold text-foreground mb-2">{t("address")}</h3><p className="text-muted-foreground">123 Beauty Lane<br />Los Angeles, CA 90210</p></div>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-secondary rounded-2xl p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4">{t("businessHours")}</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                      <p>Saturday: 10:00 AM - 4:00 PM PST</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "faqs" && (
              <div className="space-y-8">
                <h1 className="text-4xl font-bold text-foreground">{t("faqs")}</h1>
                <Accordion type="single" collapsible className="w-full">
                  {[
                    { q: "Are your products cruelty-free?", a: "Yes! All Eva Cosmetics products are 100% cruelty-free." },
                    { q: "What is your return policy?", a: "We offer a 30-day return policy for unused, unopened products." },
                    { q: "How long does shipping take?", a: "Domestic orders typically arrive within 3-5 business days." },
                    { q: "Do you offer samples?", a: "Yes! We include free samples with every order." },
                    { q: "How do I track my order?", a: "Once your order ships, you'll receive an email with tracking information." },
                  ].map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                      <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">{faq.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
