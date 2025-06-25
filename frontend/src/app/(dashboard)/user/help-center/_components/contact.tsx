import { FiMail, FiMessageCircle, FiPhone } from "react-icons/fi";
import { Tooltip } from "react-tooltip";

export default function Contact() {
  return (
    <div>
      <div className="p-8 bg-gray-50 border-t border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Need More Help?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
            <FiMessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="font-medium mb-2">Live Chat</h3>
            <p className="text-gray-600 text-sm mb-4">
              Chat directly with our support team
            </p>
            <button
              className="bg-blue-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
              disabled
              data-tooltip-id="live-chat-tooltip"
              data-tooltip-content="Live chat is currently under maintenance"
            >
              Start Chat
            </button>

            <Tooltip
              id="live-chat-tooltip"
              place="bottom"
              style={{
                backgroundColor: "#1f2937",
                color: "white",
                fontSize: "0.75rem",
                borderRadius: "6px",
                padding: "6px 10px",
              }}
            />
          </div>

          <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
            <FiMail className="w-8 h-8 text-green-600 mx-auto mb-4" />
            <h3 className="font-medium mb-2">Email Support</h3>
            <p className="text-gray-600 text-sm mb-4">
              Send us your questions via email
            </p>
            <a
              href="mailto:csjobsdoors@support.com"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Send Email
            </a>
          </div>

          <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
            <FiPhone className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <h3 className="font-medium mb-2">Phone Support</h3>
            <p className="text-gray-600 text-sm mb-4">
              Call us during business hours
            </p>
            <a
              href="tel:1234567890"
              className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>Business hours: Monday - Friday, 9:00 AM - 5:00 PM</p>
          <p className="mt-2">Average response time: 2-4 business hours</p>
        </div>
      </div>
    </div>
  );
}
