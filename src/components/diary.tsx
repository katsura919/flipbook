"use client";

import { useEffect, useState } from "react";
import { Trash2, Plus, Save } from "lucide-react";

interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  createdAt: number;
}

export default function Diary() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load entries from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("diaryEntries");
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load diary entries:", error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save to local storage whenever entries change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("diaryEntries", JSON.stringify(entries));
    }
  }, [entries, isLoading]);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleAddEntry = () => {
    if (!title.trim() && !content.trim()) {
      alert("Please add a title or content");
      return;
    }

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      title: title || "Untitled Entry",
      content,
      date: formatDate(new Date()),
      createdAt: Date.now(),
    };

    setEntries([newEntry, ...entries]);
    setTitle("");
    setContent("");
  };

  const handleSaveEdit = () => {
    if (editingId) {
      setEntries(
        entries.map((entry) =>
          entry.id === editingId
            ? {
                ...entry,
                title: title || "Untitled Entry",
                content,
              }
            : entry,
        ),
      );
      setEditingId(null);
      setTitle("");
      setContent("");
    }
  };

  const handleEdit = (entry: DiaryEntry) => {
    setEditingId(entry.id);
    setTitle(entry.title);
    setContent(entry.content);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      setEntries(entries.filter((entry) => entry.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Loading your diary...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">My Diary</h1>
          <p className="text-sm text-muted-foreground">
            Your personal notebook saved locally
          </p>
        </div>

        {/* New Entry Form */}
        <div className="notebook-entry mb-8 p-6">
          <h2 className="text-lg font-semibold text-primary mb-4">
            {editingId ? "Edit Entry" : "New Entry"}
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Entry title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-card text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent placeholder-muted-foreground"
            />

            <textarea
              placeholder="Write your thoughts here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="notebook-textarea w-full min-h-[200px]"
            />

            <div className="flex gap-3">
              {editingId ? (
                <>
                  <button
                    onClick={handleSaveEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-opacity-90 transition-all"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-opacity-80 transition-all"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAddEntry}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-opacity-90 transition-all"
                >
                  <Plus size={18} />
                  Add Entry
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Entries List */}
        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-2">
                No entries yet. Create your first diary entry!
              </p>
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="notebook-entry p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="notebook-entry-title">{entry.title}</h3>
                    <p className="notebook-entry-date">{entry.date}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm hover:bg-opacity-80 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-1 bg-destructive text-destructive-foreground rounded-md hover:bg-opacity-90 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <p className="text-foreground whitespace-pre-wrap text-sm leading-relaxed">
                  {entry.content}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {entries.length > 0 && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>{entries.length} entry/entries saved • Updated locally</p>
          </div>
        )}
      </div>
    </main>
  );
}
