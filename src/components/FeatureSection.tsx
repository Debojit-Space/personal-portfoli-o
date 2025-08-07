import { Card } from "@/components/ui/card";
import { TrendingUp, Brain, Sparkles } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Investment Insights",
      description: "Deep dives into the Indian stock market, investment strategies, and financial wisdom for building long-term wealth."
    },
    {
      icon: Brain,
      title: "Tech Innovation",
      description: "Exploring cutting-edge technology, AI/GenAI developments, and sharing live projects that showcase technical expertise."
    },
    {
      icon: Sparkles,
      title: "Spiritual Growth",
      description: "A journey through spiritual practices, mindfulness, and the quest for deeper meaning in our modern world."
    }
  ];

  return (
    <section className="bg-section-dark py-20 px-6" id="about">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-transparent border-feature-icon/20 p-8 text-center">
              <div className="w-16 h-16 bg-feature-icon rounded-full flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-section-dark" />
              </div>
              <h3 className="text-xl font-semibold text-section-dark-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-section-dark-foreground/80 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;