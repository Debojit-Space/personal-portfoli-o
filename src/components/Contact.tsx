import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageCircle, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const email = "debojitkangsabanik@gmail.com"; 

  const handleEmailClick = () => {
    navigator.clipboard.writeText(email);
    toast({
      title: "Email copied",
      description: "Email address has been copied to the clipboard.",
      duration: 2000,
    });
  };

  const handleMessageClick = () => {
    window.open(
      "https://wa.me/918011129328?text=Hi%20Debojit,%20I%20found%20you%20from%20your%20website!",
      "_blank"
    );
  };
  const handleMeetingClick = () => {
    window.open(
      "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3X46_VYOB0HWWJJiY2GhihgN7LizUg1K_3VIqK6-iq6tfdnek2moyOYnGbqhRCvnDBBkDAn6SC",
      "_blank"
    );
  };


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
          <Card
              variant="neumorphicDark"
              className="bg-transparent border-feature-icon/20 cursor-pointer"
              onClick={handleEmailClick}
          >
            <CardContent className="p-6 text-center">
              <Mail className="w-8 h-8 text-feature-icon mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-section-dark-foreground mb-2">Email</h3>
              <p className="text-section-dark-foreground/80">Click to copy my email</p>
            </CardContent>
          </Card>
          
          <Card
            variant="neumorphicDark"
            className="bg-transparent border-feature-icon/20 cursor-pointer"
            onClick={handleMessageClick}
          >            
          <CardContent className="p-6 text-center">
              <MessageCircle className="w-8 h-8 text-feature-icon mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-section-dark-foreground mb-2">Message</h3>
              <p className="text-section-dark-foreground/80">Quick chat on WhatsApp</p>
            </CardContent>
          </Card>
          
          <Card
            variant="neumorphicDark"
            className="bg-transparent border-feature-icon/20 cursor-pointer"
            onClick={handleMeetingClick}
          >
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-feature-icon mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-section-dark-foreground mb-2">Meeting</h3>
              <p className="text-section-dark-foreground/80">Schedule a Google Meeting</p>
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