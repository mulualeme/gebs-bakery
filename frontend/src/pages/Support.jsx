import { useState } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const faqs = [
  {
    question: "What are your delivery hours?",
    answer:
      "We deliver from 8 AM to 8 PM, seven days a week. Delivery times may vary based on your location and order volume.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order is confirmed, you'll receive a tracking link via email and SMS. You can also check your order status in the 'Orders' section of your account.",
  },
  {
    question: "What's your refund policy?",
    answer:
      "If you're not satisfied with your order, please contact us within 24 hours of delivery. We'll either replace your order or provide a full refund.",
  },
  {
    question: "Do you cater for special dietary requirements?",
    answer:
      "Yes! We offer various options for different dietary needs including gluten-free, vegan, and nut-free items. Please check the item descriptions or contact us for specific requirements.",
  },
  {
    question: "How far in advance should I place a catering order?",
    answer:
      "For catering orders, we recommend booking at least 48 hours in advance. For large events, please contact us at least a week ahead.",
  },
];

export default function Support() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Support Center
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            We&apos;re here to help! Choose how you&apos;d like to reach us.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Email Support */}
          <div className="rounded-xl bg-white p-6 shadow-md transition-transform hover:-translate-y-1">
            <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Email Support</h3>
            <p className="mb-4 text-gray-600">
              Get in touch via email for any inquiries
            </p>
            <a
              href="mailto:support@gebsbakery.com"
              className="text-primary hover:underline"
            >
              support@gebsbakery.com
            </a>
          </div>

          {/* Phone Support */}
          <div className="rounded-xl bg-white p-6 shadow-md transition-transform hover:-translate-y-1">
            <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Phone Support</h3>
            <p className="mb-4 text-gray-600">
              Speak directly with our support team
            </p>
            <a href="tel:+1234567890" className="text-primary hover:underline">
              (123) 456-7890
            </a>
          </div>

          {/* Live Chat */}
          <div className="rounded-xl bg-white p-6 shadow-md transition-transform hover:-translate-y-1">
            <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Live Chat</h3>
            <p className="mb-4 text-gray-600">
              Chat with our support team in real-time
            </p>
            <button className="text-primary hover:underline">Start Chat</button>
          </div>
        </div>

        {/* Business Hours */}
        <div className="mb-12 rounded-xl bg-white p-6 shadow-md">
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Business Hours</h2>
          </div>
          <div className="mt-4 grid gap-2 text-gray-600 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-medium">Monday - Friday</p>
              <p>7:00 AM - 9:00 PM</p>
            </div>
            <div>
              <p className="font-medium">Saturday</p>
              <p>8:00 AM - 9:00 PM</p>
            </div>
            <div>
              <p className="font-medium">Sunday</p>
              <p>8:00 AM - 8:00 PM</p>
            </div>
            <div>
              <p className="font-medium">Holidays</p>
              <p>Hours may vary</p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-6 text-2xl font-semibold">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="py-4">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between text-left font-medium text-gray-900"
                >
                  <span>{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-primary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
