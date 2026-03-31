"use client";

import { useState } from "react";
import { PlaybookData } from "@/types/playbook";

interface WellnessFormProps {
  onGenerate: (data: PlaybookData, images: { profile: string | null; family: string | null }) => void;
}

export default function WellnessForm({ onGenerate }: WellnessFormProps) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [goal, setGoal] = useState("");
  const [moodSummary, setMoodSummary] = useState("");
  const [foodSummary, setFoodSummary] = useState("");
  const [exerciseSummary, setExerciseSummary] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [familyPhoto, setFamilyPhoto] = useState<string | null>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (v: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setter(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = name.trim() || "Friend";

    const data: PlaybookData = {
      page1: {
        title: `Welcome, ${displayName} 🌿`,
        subtitle: "Your wellness journey starts here",
        content: `This playbook is a reflection of your effort and growth, ${displayName}. ${bio.trim() ? bio.trim() : "You are taking meaningful steps toward a healthier and more balanced life."} Every small step forward is worth celebrating — and this is just the beginning.`,
        prompts: [],
        placeholders: ["profile_photo", "family_photo"],
      },
      page2: {
        title: "Your Weekly Snapshot",
        subtitle: "Small wins matter",
        content: `${foodSummary.trim() ? `🥗 Food: ${foodSummary.trim()}` : "🥗 Food: You're building mindful eating habits."}\n\n${moodSummary.trim() ? `😊 Mood: ${moodSummary.trim()}` : "😊 Mood: You showed emotional resilience this week."}\n\n${exerciseSummary.trim() ? `🏃 Movement: ${exerciseSummary.trim()}` : "🏃 Movement: Your body is moving and that counts!"}`,
        prompts: [],
      },
      page3: {
        title: "Your Patterns",
        subtitle: "What your habits reveal",
        content: `${goal.trim() ? `Your goal of "${goal.trim()}" is shaping your daily choices in powerful ways.` : "Your daily choices are shaping a healthier you."} On days when your mood felt lighter, your food and movement habits likely played a role. Consistency — even imperfect consistency — leads to lasting change. You're building something real here.`,
        prompts: ["How did your meals affect your energy levels?", "When did you feel most motivated to move?"],
      },
      page4: {
        title: "Reflection",
        subtitle: "Pause and think",
        content: "Growth begins with awareness. Take a moment to reflect on your week — the wins, the struggles, and everything in between. Write your thoughts below.",
        prompts: [
          "What made you feel your best this week?",
          "What habits do you want to improve?",
          "What are you most proud of?",
          "What will you do differently next week?",
          `How close are you to your goal: "${goal.trim() || "your wellness goal"}"?`,
          "What does feeling healthy mean to you?",
        ],
      },
    };

    onGenerate(data, { profile: profilePhoto, family: familyPhoto });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(135deg, #e8f5e9 0%, #f3e5f5 50%, #e3f2fd 100%)" }}>
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-3">🌿</div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#2e7d32", fontFamily: "Georgia, serif" }}>
            Wellness Playbook
          </h1>
          <p className="text-sm" style={{ color: "#66bb6a" }}>
            Fill in your details to generate your personalized 4-page digital playbook
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl shadow-xl p-8 flex flex-col gap-6"
          style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)" }}>

          {/* Name + Bio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#388e3c" }}>
                Your Name *
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah"
                required
                className="border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: "#a5d6a7", focusRingColor: "#66bb6a", color: "#333" }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#388e3c" }}>
                Short Bio
              </label>
              <input
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="e.g. Busy mom of 2, loves yoga"
                className="border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: "#a5d6a7", color: "#333" }}
              />
            </div>
          </div>

          {/* Goal */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#388e3c" }}>
              Your Wellness Goal
            </label>
            <input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Lose 5kg, sleep better, reduce stress"
              className="border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
              style={{ borderColor: "#a5d6a7", color: "#333" }}
            />
          </div>

          {/* Summaries */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#388e3c" }}>
                😊 Mood This Week
              </label>
              <textarea
                value={moodSummary}
                onChange={(e) => setMoodSummary(e.target.value)}
                placeholder="e.g. Felt anxious Mon-Wed, better by Friday"
                rows={3}
                className="border rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2"
                style={{ borderColor: "#a5d6a7", color: "#333" }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#388e3c" }}>
                🥗 Food This Week
              </label>
              <textarea
                value={foodSummary}
                onChange={(e) => setFoodSummary(e.target.value)}
                placeholder="e.g. Ate clean 4 days, skipped breakfast twice"
                rows={3}
                className="border rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2"
                style={{ borderColor: "#a5d6a7", color: "#333" }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#388e3c" }}>
                🏃 Exercise This Week
              </label>
              <textarea
                value={exerciseSummary}
                onChange={(e) => setExerciseSummary(e.target.value)}
                placeholder="e.g. 3x gym, 2 walks, rest on weekends"
                rows={3}
                className="border rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2"
                style={{ borderColor: "#a5d6a7", color: "#333" }}
              />
            </div>
          </div>

          {/* Photo Uploads */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Profile Photo", photo: profilePhoto, setter: setProfilePhoto },
              { label: "Family Photo", photo: familyPhoto, setter: setFamilyPhoto },
            ].map(({ label, photo, setter }) => (
              <div key={label} className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#388e3c" }}>
                  {label}
                </label>
                <label className="cursor-pointer group">
                  <div className="border-2 border-dashed rounded-2xl overflow-hidden flex items-center justify-center"
                    style={{ borderColor: "#a5d6a7", height: "100px", background: photo ? "transparent" : "#f1f8e9" }}>
                    {photo ? (
                      <img src={photo} alt={label} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl">📷</span>
                        <span className="text-xs" style={{ color: "#81c784" }}>Upload</span>
                      </div>
                    )}
                  </div>
                  <input type="file" accept="image/*" className="hidden"
                    onChange={(e) => handleImageUpload(e, setter)} />
                </label>
              </div>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl font-bold text-white text-base tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #43a047, #66bb6a)", boxShadow: "0 4px 20px rgba(67,160,71,0.4)" }}
          >
            ✨ Generate My Playbook
          </button>
        </form>
      </div>
    </div>
  );
}
