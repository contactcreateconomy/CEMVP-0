import { BenefitCard } from "./benefit-card";
import { UsernameForm } from "./username-form";
import { Square, MessageCircle, Download } from "lucide-react";

interface AuthCardProps {
  brandName?: string;
  heading?: string;
  benefits?: Array<{
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
  }>;
}

const defaultBenefits = [
  {
    icon: Square,
    title: "Connect with Peers",
    description: "Connect with other indie hackers running online businesses.",
  },
  {
    icon: MessageCircle,
    title: "Get Feedback",
    description: "Get feedback on your business ideas, landing pages, and more.",
  },
  {
    icon: Download,
    title: "Stay Updated",
    description: "Get the best new stories from founders in your inbox.",
  },
];

export function AuthCard({
  brandName = "Hipnode",
  heading = "Join a thriving community of entrepreneurs and developers.",
  benefits = defaultBenefits,
}: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f0f0] p-4">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl lg:flex-row">
        {/* Left Column - Benefits */}
        <div className="flex w-full flex-col justify-center bg-[#1E252B] p-8 lg:w-1/2 lg:p-12">
          {/* Brand */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">{brandName}</h2>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold leading-tight text-white lg:text-3xl">
              {heading}
            </h1>
          </div>

          {/* Benefits */}
          <div className="flex flex-col gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>

        {/* Right Column - Sign Up Form */}
        <div className="flex w-full items-center justify-center bg-white p-8 lg:w-1/2 lg:p-12">
          <div className="w-full max-w-md">
            <UsernameForm />
          </div>
        </div>
      </div>
    </div>
  );
}
