import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageCircle, Calendar } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="bg-section-dark py-20 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-section-dark-foreground mb-6">
          Let's Connect & Collaborate
        </h2>
        <p className="text-xl text-section-dark-foreground/80 mb-12 max-w-2xl mx-auto">
          Whether you want to discuss market insights, tech innovations, or spiritual growth, 
          I'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card variant="neumorphicDark" className="bg-transparent border-feature-icon/20">
            <CardContent className="p-6 text-center">
              <Mail className="w-8 h-8 text-feature-icon mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-section-dark-foreground mb-2">Email</h3>
              <p className="text-section-dark-foreground/80">Drop me a line anytime</p>
            </CardContent>
          </Card>
          
          <Card variant="neumorphicDark" className="bg-transparent border-feature-icon/20">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-8 h-8 text-feature-icon mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-section-dark-foreground mb-2">Message</h3>
              <p className="text-section-dark-foreground/80">Quick chat on social media</p>
            </CardContent>
          </Card>
          
          <Card variant="neumorphicDark" className="bg-transparent border-feature-icon/20">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-feature-icon mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-section-dark-foreground mb-2">Meeting</h3>
              <p className="text-section-dark-foreground/80">Schedule a virtual coffee</p>
            </CardContent>
          </Card>
        </div>

        <Button variant="neumorphicDark"
          className="bg-section-dark-foreground text-section-dark hover:bg-section-dark-foreground/90 px-8 py-4 text-lg rounded-full"
        >
          Start a Conversation
        </Button>
      </div>
    </section>
  );
};

export default Contact;