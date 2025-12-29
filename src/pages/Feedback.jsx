import React, { useState, useEffect } from "react";
import { MdForum, MdLightbulb, MdBugReport, MdBuild, MdHelp, MdAdd, MdKeyboardArrowUp, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

// Get or create a persistent visitor ID for upvoting
function getVisitorId() {
  let id = localStorage.getItem("blacktop-blitz-visitor-id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("blacktop-blitz-visitor-id", id);
  }
  return id;
}

const FEEDBACK_TYPES = [
  { value: "feature", label: "Feature", icon: MdLightbulb, color: "bg-blue-500" },
  { value: "bug", label: "Bug", icon: MdBugReport, color: "bg-red-500" },
  { value: "improvement", label: "Improvement", icon: MdBuild, color: "bg-yellow-500" },
  { value: "other", label: "Other", icon: MdHelp, color: "bg-gray-500" },
];

function FeedbackForm({ onClose, onSubmit, isSubmitting }) {
  const [type, setType] = useState("feature");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authorName, setAuthorName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onSubmit({ type, title, description, authorName });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-lg bg-gray-900 rounded-xl p-6 shadow-2xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <MdClose size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-4">Submit Feedback</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type selector */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
            <div className="flex flex-wrap gap-2">
              {FEEDBACK_TYPES.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setType(t.value)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                      type === t.value
                        ? `${t.color} text-white`
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    <Icon size={16} />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title <span className="text-gray-500">({title.length}/100)</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 100))}
              placeholder="Short, descriptive title"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description <span className="text-gray-500">({description.length}/500)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 500))}
              placeholder="Describe your suggestion or issue in detail..."
              rows={4}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
              required
            />
          </div>

          {/* Name (optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Name <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value.slice(0, 50))}
              placeholder="Anonymous"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !description.trim()}
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function FeedbackList({ feedback, visitorId, onUpvote }) {
  const getTypeConfig = (type) => {
    return FEEDBACK_TYPES.find((t) => t.value === type) || FEEDBACK_TYPES[3];
  };

  if (feedback === undefined || feedback === null) {
    return (
      <div className="text-center py-8 text-gray-400">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        Loading...
      </div>
    );
  }

  if (!Array.isArray(feedback) || feedback.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No suggestions yet. Be the first!
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
      {feedback.map((item) => {
        const typeConfig = getTypeConfig(item.type);
        const Icon = typeConfig.icon;
        const hasVoted = item.upvoterIds.includes(visitorId);

        return (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden"
          >
            <div className="flex">
              {/* Upvote button */}
              <button
                onClick={() => onUpvote(item._id, hasVoted)}
                className={`flex flex-col items-center justify-center px-3 py-3 border-r border-gray-700 transition-colors ${
                  hasVoted
                    ? "bg-blue-600/20 text-blue-400"
                    : "hover:bg-gray-700/50 text-gray-400 hover:text-white"
                }`}
              >
                <MdKeyboardArrowUp size={24} className={hasVoted ? "fill-current" : ""} />
                <span className="text-sm font-semibold">{item.upvotes}</span>
              </button>

              {/* Content */}
              <div className="flex-1 p-3 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${typeConfig.color} text-white flex items-center gap-1`}
                  >
                    <Icon size={12} />
                    {typeConfig.label}
                  </span>
                  {item.status !== "pending" && (
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-600 text-gray-300 capitalize">
                      {item.status}
                    </span>
                  )}
                </div>
                <h3 className="text-white font-medium text-sm mb-1 truncate">{item.title}</h3>
                <p className="text-gray-400 text-xs line-clamp-2">{item.description}</p>
                <div className="mt-1 text-xs text-gray-500">
                  {item.authorName || "Anonymous"} &bull;{" "}
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Convex-enabled feedback component (only rendered when Convex is available)
function ConvexFeedback() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visitorId, setVisitorId] = useState("");

  const feedback = useQuery(api.feedback.getFeedback);
  const submitFeedbackMutation = useMutation(api.feedback.submitFeedback);
  const upvoteFeedbackMutation = useMutation(api.feedback.upvoteFeedback);
  const removeUpvoteMutation = useMutation(api.feedback.removeUpvote);

  useEffect(() => {
    setVisitorId(getVisitorId());
  }, []);

  const handleSubmit = async ({ type, title, description, authorName }) => {
    setIsSubmitting(true);
    try {
      await submitFeedbackMutation({
        type,
        title,
        description,
        authorName: authorName || undefined,
        visitorId,
      });
      setShowForm(false);
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    }
    setIsSubmitting(false);
  };

  const handleUpvote = async (feedbackId, hasVoted) => {
    try {
      if (hasVoted) {
        await removeUpvoteMutation({ feedbackId, visitorId });
      } else {
        await upvoteFeedbackMutation({ feedbackId, visitorId });
      }
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  return (
    <>
      {/* Add suggestion button */}
      <motion.button
        onClick={() => setShowForm(true)}
        className="menu-btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium mb-8 flex items-center gap-2 mx-auto transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <MdAdd size={24} />
        Add Suggestion
      </motion.button>

      {/* Feedback list */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-left"
      >
        <FeedbackList
          feedback={feedback}
          visitorId={visitorId}
          onUpvote={handleUpvote}
        />
      </motion.div>

      {/* Feedback Form Modal */}
      <AnimatePresence>
        {showForm && (
          <FeedbackForm
            onClose={() => setShowForm(false)}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default function Feedback() {
  return (
    <div className="h-full flex justify-center lg:items-center sm:items-start overflow-auto py-8">
      <div className="text-white p-4 text-center w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="md:text-6xl text-4xl font-serif mb-4">FEEDBACK</h1>
          <p className="md:text-xl text-lg text-gray-300 mb-8">
            Help us improve Blacktop Blitz! Submit suggestions, report bugs, or upvote ideas you like.
          </p>

          <ConvexFeedback />

          {/* GitHub discussions fallback */}
          <motion.div
            className="mt-8 pt-8 border-t border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-gray-400 text-sm mb-4">
              You can also join the discussion on GitHub:
            </p>
            <a
              href="https://github.com/woverfield/blacktop-blitz/discussions"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="menu-btn bg-gray-700 hover:bg-gray-600 p-4 rounded-xl transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MdForum className="size-8" />
              </motion.button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
