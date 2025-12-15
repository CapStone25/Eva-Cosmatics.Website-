import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState("about");

  const sections = [
    { id: "about", label: "About Us" },
    { id: "shipping", label: "Shipping & Returns" },
    { id: "contact", label: "Contact Us" },
    { id: "faqs", label: "FAQs" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-[280px_1fr] gap-12">
          {/* Sidebar Navigation */}
          <aside className="bg-card rounded-2xl p-6 h-fit shadow-card">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                    activeSection === section.id
                      ? "text-primary bg-primary/10"
                      : "text-foreground/80 hover:text-primary hover:bg-muted"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content Area */}
          <div className="animate-fade-in">
            {activeSection === "about" && (
              <div className="space-y-8">
                <h1 className="text-4xl font-bold text-foreground">About Eva Cosmetics</h1>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-lg leading-relaxed">
                    Eva Cosmetics was born from a passion for natural beauty and sustainable skincare. 
                    Our journey began with a simple belief: everyone deserves access to high-quality, 
                    ethical beauty products that enhance their natural radiance.
                  </p>
                  <p className="text-lg leading-relaxed">
                    We carefully source our ingredients from trusted suppliers who share our commitment 
                    to sustainability and ethical practices. Each product is formulated with love and 
                    expertise, ensuring that you receive only the best for your skin.
                  </p>
                  <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">Our Mission</h3>
                  <p className="text-lg leading-relaxed">
                    To provide luxurious, effective skincare solutions that are gentle on your skin 
                    and kind to our planet. We believe in transparency, quality, and the transformative 
                    power of self-care.
                  </p>
                </div>
              </div>
            )}

            {activeSection === "shipping" && (
              <div className="space-y-8">
                <h1 className="text-4xl font-bold text-foreground">SHIPPING</h1>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="domestic" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">
                      Domestic Shipping
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      <p>We offer free standard shipping on all orders over $50. Standard shipping typically takes 3-5 business days.</p>
                      <p className="mt-2">Express shipping is available for an additional fee and delivers within 1-2 business days.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="international" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">
                      International Shipping
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      <p>We're pleased to offer international shipping via BorderGuru. International shipping and import fees including customs duties, taxes and fees are calculated at check-out. Depending on destination, transit time can take from 4 to 12 business days.</p>
                      <p className="mt-4"><strong className="text-foreground">Please note we do not accept returns on international orders.</strong></p>
                      <p className="mt-4">All products are shipped directly from Los Angeles, CA. Orders placed before 3 pm PST/PDT will be processed and shipped by the next business day. Orders placed on Fridays and over the weekend will be processed and shipped by the following Monday. Shipping confirmation email along with tracking information will be sent when your order is processed.</p>
                      <p className="mt-4">Please note we are not responsible for lost or stolen packages, or returned or delayed packages by the postal service.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="restriction" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">
                      Shipping Restriction
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      <p>Some products may have shipping restrictions due to their ingredients or size. Please check the product page for any specific shipping limitations.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <h1 className="text-4xl font-bold text-foreground pt-8">RETURNS</h1>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="policy" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">
                      Return Policy
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      <p>We accept returns within 30 days of purchase for unused, unopened products in their original packaging.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="how-to" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">
                      How To Return
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      <p>To initiate a return, please contact our customer service team with your order number. We will provide you with a prepaid shipping label and return instructions.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="refunds" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">
                      Refunds
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      <p>Once we receive your return, we will process your refund within 5-7 business days. Refunds will be issued to the original payment method.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            {activeSection === "contact" && (
              <div className="space-y-8">
                <h1 className="text-4xl font-bold text-foreground">Contact Us</h1>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Email</h3>
                      <p className="text-muted-foreground">support@evacosmetics.com</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Phone</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Address</h3>
                      <p className="text-muted-foreground">
                        123 Beauty Lane<br />
                        Los Angeles, CA 90210<br />
                        United States
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-secondary rounded-2xl p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Business Hours</h3>
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
                <h1 className="text-4xl font-bold text-foreground">Frequently Asked Questions</h1>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq-1" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">
                      Are your products cruelty-free?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Yes! All Eva Cosmetics products are 100% cruelty-free. We never test on animals and are certified by Leaping Bunny.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq-2" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">
                      What is your return policy?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      We offer a 30-day return policy for unused, unopened products. Please visit our Shipping & Returns section for more details.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq-3" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">
                      How long does shipping take?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Domestic orders typically arrive within 3-5 business days. International shipping can take 4-12 business days depending on destination.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq-4" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">
                      Do you offer samples?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Yes! We include free samples with every order so you can try new products before committing to full sizes.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="faq-5" className="border-border">
                    <AccordionTrigger className="text-lg font-medium text-foreground hover:text-primary">
                      How do I track my order?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Once your order ships, you'll receive an email with tracking information. You can also track your order by logging into your account.
                    </AccordionContent>
                  </AccordionItem>
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
