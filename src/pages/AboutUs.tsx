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
      <main className="container mx-auto px-4 py-6 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-12">
          <aside className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 h-fit shadow-card">
            <nav className="flex md:flex-col gap-1 md:gap-2 overflow-x-auto pb-2 md:pb-0">
              {sections.map((section) => (
                <button key={section.id} onClick={() => setActiveSection(section.id)} className={`whitespace-nowrap text-start px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-300 font-medium text-sm md:text-base flex-shrink-0 md:w-full ${activeSection === section.id ? "text-primary bg-primary/10" : "text-foreground/80 hover:text-primary hover:bg-muted"}`}>
                  {section.label}
                </button>
              ))}
            </nav>
          </aside>

          <div className="animate-fade-in">
            {activeSection === "about" && (
              <div className="space-y-6 md:space-y-8">
                <h1 className="text-2xl md:text-4xl font-bold text-foreground">{t("aboutUsTitle")}</h1>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed">{t("aboutUsDesc1")}</p>
                  <p className="text-lg leading-relaxed">{t("aboutUsDesc2")}</p>
                  <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">{t("ourMission")}</h3>
                  <p className="text-lg leading-relaxed">{t("ourMissionDesc")}</p>
                </div>
              </div>
            )}

            {activeSection === "shipping" && (
              <div className="space-y-6 md:space-y-8">
                <h1 className="text-2xl md:text-4xl font-bold text-foreground">{t("shipping")}</h1>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="domestic" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">{t("domesticShipping")}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      <p>{t("domesticShippingDesc1")}</p>
                      <p className="mt-2">{t("domesticShippingDesc2")}</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="international" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">{t("internationalShipping")}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      <p>{t("internationalShippingDesc")}</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="restriction" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">{t("shippingRestriction")}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      <p>{t("shippingRestrictionDesc")}</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <h1 className="text-2xl md:text-4xl font-bold text-foreground pt-6 md:pt-8">{t("returns")}</h1>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="policy" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">{t("returnPolicy")}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{t("returnPolicyDesc")}</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="how-to" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">{t("howToReturn")}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{t("howToReturnDesc")}</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="refunds" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">{t("refunds")}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{t("refundsDesc")}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            {activeSection === "contact" && (
              <div className="space-y-6 md:space-y-8">
                <h1 className="text-2xl md:text-4xl font-bold text-foreground">{t("aboutSideContact")}</h1>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div><h3 className="text-xl font-semibold text-foreground mb-2">{t("email")}</h3><p className="text-muted-foreground">support@evacosmetics.com</p></div>
                    <div><h3 className="text-xl font-semibold text-foreground mb-2">{t("phone")}</h3><p className="text-muted-foreground">+1 (555) 123-4567</p></div>
                    <div><h3 className="text-xl font-semibold text-foreground mb-2">{t("address")}</h3><p className="text-muted-foreground">123 Beauty Lane<br />Los Angeles, CA 90210</p></div>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-secondary rounded-2xl p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4">{t("businessHours")}</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p>{t("businessHoursWeekday")}</p>
                      <p>{t("businessHoursSaturday")}</p>
                      <p>{t("businessHoursSunday")}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "faqs" && (
              <div className="space-y-6 md:space-y-8">
                <h1 className="text-2xl md:text-4xl font-bold text-foreground">{t("faqs")}</h1>
                <Accordion type="single" collapsible className="w-full">
                  {[
                    { q: t("faqQ1"), a: t("faqA1") },
                    { q: t("faqQ2"), a: t("faqA2") },
                    { q: t("faqQ3"), a: t("faqA3") },
                    { q: t("faqQ4"), a: t("faqA4") },
                    { q: t("faqQ5"), a: t("faqA5") },
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
