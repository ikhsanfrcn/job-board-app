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
      question: "How do I create a new account?",
      answer:
        'To create a new account, click the "Sign Up" button on the homepage, fill out the form with required information including your full name, email, and password. After that, verify your email through the link sent to your email.',
    },
    {
      id: 2,
      category: "account",
      question: "How do I update my profile information?",
      answer:
        'Go to your dashboard, click "Profile" in the navigation menu, then click "Edit Profile". You can update your profile information such as name, email address, work experience, and skills. Don\'t forget to click "Save" when you\'re done.',
    },
    {
      id: 3,
      category: "jobs",
      question: "How do I search for job openings?",
      answer:
        "Use the search feature in your dashboard by entering keywords for position, company name, or location. You can also use filters to narrow down results by salary, job type, experience level, and industry category.",
    },
    {
      id: 4,
      category: "jobs",
      question: "How do I apply for a job?",
      answer:
        'After finding a suitable position, click "Apply Now", select or upload your latest resume, write a cover letter (optional), and click "Submit Application". You can track your application status in the "Job Activity" menu.',
    },
    {
      id: 5,
      category: "jobs",
      question: "What is the application process for jobs that require a test?",
      answer:
        'For certain job openings that include a test requirement, you must complete the test first by clicking the "Take Test" button on the job detail page. Once you finish the test, you can proceed to apply by submitting your CV and expected salary, then click "Apply".',
    },
    {
      id: 6,
      category: "billing",
      question: "What subscription plans are available and what do they offer?",
      answer:
        "We offer two subscription plans to support your job-seeking journey.\n\n" +
        "The Standard plan costs IDR 25,000 per month. It includes access to the CV Generator and allows you to take up to two skill assessments per month.\n\n" +
        "The Professional plan costs IDR 100,000 per month. It provides full access to the CV Generator, unlimited skill assessments, and priority review when applying for jobs.",
    },
    {
      id: 7,
      category: "jobs",
      question: "How do I save jobs to favorites?",
      answer:
        'Click the bookmark icon (♡) on any job listing to save it. Saved jobs can be viewed in the "Saved Jobs" menu for easy access later.',
    },
    {
      id: 8,
      category: "account",
      question: "How do I delete my account?",
      answer:
        'Go to "Settings" > "Account" > "Delete Account". Please note that this action is permanent and will remove all your data including applications, saved jobs, and profile information.',
    },
    {
      id: 9,
      category: "jobs",
      question: "Why can't I see salary information for some jobs?",
      answer:
        "Some employers choose not to display salary information publicly. You can often find this information during the application process or interview stage. Premium users get access to salary insights and ranges.",
    },
    {
      id: 10,
      category: "security",
      question: "What should I do if I forget my password?",
      answer:
        "If you forget your password, click the 'Forgot Password' link on the login page. You will be prompted to enter your registered email address.\n\n" +
        "We will then send a password reset link to your email. Click the link, and you'll be able to enter a new password and regain access to your account.",
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
