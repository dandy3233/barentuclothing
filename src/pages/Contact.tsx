import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin } from "lucide-react";
import { FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We'd love to hear from you. Whether you have questions about our collections 
              or want to discuss custom designs, we're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="animate-fade-up">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                  />
                </div>

                <Button size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
              {/* 🗺️ Google Map Embed */}
                <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    title="Barentu Clothing Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.0518149809564!2d38.78987147415786!3d9.02176599104381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b857582e887c5%3A0x77fbb9d40f57d04c!2sMegenagna%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1697044099874!5m2!1sen!2set"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-12 animate-fade-in">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-8">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="text-gold mt-1" size={24} />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground">contact@barentuclothing.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="text-gold mt-1" size={24} />
                    <div>
                      <h3 className="font-medium mb-1">Studio Location</h3>
                      <p className="text-muted-foreground">
                        Visit us by appointment
                        <br />
                        Megenagna, Shola gebeya
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <FaPhoneAlt className="text-gold mt-1" size={24} />
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <a
                        href="tel:+251 94 177 9703"
                        className="text-muted-foreground hover:text-gold transition-colors"
                      >
                      +251 94 177 9703
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary p-8">
                <h3 className="font-serif text-2xl font-bold mb-4">
                  Press & Collaboration
                </h3>
                <p className="text-muted-foreground mb-6">
                  For press inquiries, collaborations, or partnership opportunities, 
                  please reach out to our team.
                </p>
                <p className="text-sm text-muted-foreground">
                  press@barentuclothing.com
                </p>
              </div>

              <div className="bg-secondary p-8">
                <h3 className="font-serif text-2xl font-bold mb-4">
                  Custom Design Services
                </h3>
                <p className="text-muted-foreground">
                  Interested in a custom piece? We offer bespoke design services 
                  tailored to your vision and measurements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
