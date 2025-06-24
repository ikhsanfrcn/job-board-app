"use client";

import { useState } from "react";
import {
  FiSearch,
  FiChevronDown,
  FiChevronRight,
  FiBook,
  FiUsers,
  FiBriefcase,
  FiShield,
  FiCreditCard,
} from "react-icons/fi";
import "react-tooltip/dist/react-tooltip.css";
import Contact from "./contact";

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All", icon: FiBook, color: "blue" },
    { id: "account", name: "Account & Profile", icon: FiUsers, color: "green" },
    { id: "jobs", name: "Job Search", icon: FiBriefcase, color: "purple" },
    { id: "security", name: "Security", icon: FiShield, color: "red" },
    {
      id: "billing",
      name: "Subscription",
      icon: FiCreditCard,
      color: "indigo",
    },
  ];

  const faqs = [
    {
      id: 1,
      category: "account",
      question: "How do I create a company account?",
      answer:
        'Click the "Sign Up" button on the homepage, select "Company Account", then fill in the required details such as company name, official email, and password. Verify your email to activate the account.',
    },
    {
      id: 2,
      category: "account",
      question: "How can I manage my company profile?",
      answer:
        'Log in to your dashboard and navigate to "Company Profile". Here you can update your company description, logo, industry, and contact details.',
    },
    {
      id: 3,
      category: "jobs",
      question: "How do I post a new job opening?",
      answer:
        'Go to your company dashboard, click "Post a Job", and fill in the job title, description, location, salary range, and required qualifications. Once completed, click "Publish".',
    },
    {
      id: 4,
      category: "jobs",
      question: "How do I manage and review applicants?",
      answer:
        'Go to the "Manage Jobs" section, select the job you want to review, then open the "Applicants" tab. You can view CVs, assessment results, and update application status (e.g., "Reviewed", "Interviewed", "Rejected").',
    },
    {
      id: 5,
      category: "jobs",
      question: "Can I assign assessments to applicants?",
      answer:
        "Yes, when creating or editing a job post, you can add test assessments that applicants must complete before applying.",
    },
    {
      id: 6,
      category: "billing",
      question: "Are there any subscription plans for companies?",
      answer:
        "At the moment, there are no subscription plans or billing features available for company accounts. All job postings and applicant management tools are currently free to use. We will notify you in advance if any premium features are introduced in the future.",
    },
    {
      id: 7,
      category: "account",
      question: "Can I manage multiple job postings at once?",
      answer:
        "Yes, you can manage multiple job postings simultaneously from your company dashboard. Use the 'Job Listings' section to edit or close each post as needed.",
    },
    {
      id: 8,
      category: "account",
      question: "How can I delete my company account?",
      answer:
        'Please contact our support team via the "Contact" page. Account deletion requests are manually verified and are permanent.',
    },
    {
      id: 9,
      category: "security",
      question: "Is my company data secure?",
      answer:
        "We use SSL encryption and advanced security measures to protect your company and applicant data. Sensitive data access is restricted to verified administrators only.",
    },
    {
      id: 10,
      category: "security",
      question: "What should I do if I forget my password?",
      answer:
        'Click "Forgot Password" on the login page, enter your registered company email, and follow the instructions sent to your inbox to reset your password.',
    },
  ];

  const filteredFaqs =
    selectedCategory === "all"
      ? faqs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : faqs.filter(
          (faq) =>
            faq.category === selectedCategory &&
            (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
        );

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const getColorClasses = (color: string): string => {
    const colors: Record<string, string> = {
      blue: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
      green: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
      purple:
        "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
      orange:
        "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
      red: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
      indigo:
        "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100",
    };

    return colors[color] || colors.blue;
  };

  return (
    <div>
      <div className="p-8 border-b border-gray-200">
        <div className="max-w-2xl mx-auto relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for help, guides, or FAQs..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="p-8 border-b border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Help Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  selectedCategory === category.id
                    ? getColorClasses(category.color)
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-8">
        <h2 className="text-xl font-semibold mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">
                  {faq.question}
                </span>
                {expandedFaq === faq.id ? (
                  <FiChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <FiChevronRight className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {expandedFaq === faq.id && (
                <div className="px-4 pb-4 text-gray-700 border-t border-gray-100">
                  <p className="pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FiSearch className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-600">
              Try using different keywords or select a different category
            </p>
          </div>
        )}
      </div>

      <Contact />
    </div>
  );
}
