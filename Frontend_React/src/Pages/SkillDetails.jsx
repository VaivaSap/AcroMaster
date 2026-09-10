import { useParams, useNavigate } from "react-router-dom";
import {
  getSkillById,
  updateSkill,
  getSkillAttempts,
  getSkillsByDiscipline,
} from "../Services/SkillService";
import { useState, useEffect } from "react";
import UserMenu from "../Components/UserMenu";
import { authHeaders, authFetch } from "../Services/AuthService";

function SkillDetails() {
  const { skillId } = useParams();
  const [skill, setSkill] = useState(null);
  const [editing, setEditing] = useState(false);
  const [isPrereqModalOpen, setIsPrereqModalOpen] = useState(false);
  const [localSkill, setLocalSkill] = useState(skill);
  const [skillAttempts, setSkillAttempts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedAttemptImage, setSelectedAttemptImage] = useState(null);
  const navigate = useNavigate();
  const { disciplineName } = useParams();
  const [availableSkills, setAvailableSkills] = useState([]);

  const isVideo = (url) => {
    return (
      url.endsWith(".mp4") || url.endsWith(".mov") || url.endsWith(".webm")
    );
  };

  const [form, setForm] = useState({
    name: "",
    status: "",
    difficulty: "",
    categories: [],
    youtubeUrl: "",
    notes: "",
  });

  const handleSave = async () => {
    const updated = { ...localSkill, ...form };
    await updateSkill(localSkill.id, updated);
    setLocalSkill(updated);
    setEditing(false);
  };

  useEffect(() => {
    getSkillById(skillId).then((data) => {
      setSkill(data);
      setLocalSkill(data);
      setForm({
        name: data.name,
        status: data.status,
        difficulty: data.difficulty,
        categories: data.categories,
        youtubeUrl: data.youtubeUrl || "",
        notes: data.notes || "",
      });
    });
    getSkillAttempts(skillId).then(setSkillAttempts);
  }, [skillId]);

  useEffect(() => {
    if (isPrereqModalOpen) {
      getSkillsByDiscipline().then(setAvailableSkills);
    }
  }, [isPrereqModalOpen]);

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("skillId", skillId);

    const response = await fetch("/api/skillattempts", {
      method: "POST",
      headers: { Authorization: authHeaders().Authorization },
      body: formData,
    });

    if (response.ok) {
      getSkillAttempts(skillId).then(setSkillAttempts);
      setSelectedFile(null);
    }
  };

  const handleDeleteAttempt = async (attemptId) => {
    if (!window.confirm("Delete this attempt?")) return;

    const response = await authFetch(`/api/skillattempts/${attemptId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      getSkillAttempts(skillId).then(setSkillAttempts);
    }
  };

  if (!skill) return <div className="text-white p-4">Loading</div>;

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-white font-bold">{localSkill.name}</h1>
          <button onClick={() => setEditing(true)}>✏️</button>
        </div>
        <UserMenu />
      </div>

      <div className="mt-3 border-t border-gray-600 pt-3 text-sm text-gray-300">
        {editing ? (
          <>
            <input
              className="bg-gray-700 text-white rounded p-1 w-full mb-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <select
              className="bg-gray-700 text-white rounded p-1 w-full mb-2"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="Learning">Learning</option>
              <option value="Succeeded">Succeeded</option>
              <option value="Mastered">Mastered</option>
              <option value="MasteredButNeedsAttention">
                Mastered But Needs Attention
              </option>
            </select>
            <select
              className="bg-gray-700 text-white rounded p-1 w-full mb-2"
              value={form.difficulty}
              onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <select
              className="bg-gray-700 text-white rounded p-1 w-full mb-2"
              value={form.categories[0]}
              onChange={(e) =>
                setForm({ ...form, categories: [e.target.value] })
              }
            >
              <option value="Balance">Balance</option>
              <option value="Dynamic">Dynamic</option>
              <option value="Flexibility">Flexibility</option>
              <option value="Strength">Strength</option>
              <option value="Transition">Transition</option>
            </select>
            <input
              className="bg-gray-700 text-white rounded p-1 w-full mb-2"
              placeholder="URL"
              value={form.youtubeUrl}
              onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
            />
            <input
              className="bg-gray-700 text-white rounded p-1 w-full mb-2"
              placeholder="Notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
            <input
              type="file"
              accept="image/*, video/*"
              id="fileInput"
              className="hidden"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <label
              htmlFor="fileInput"
              className="bg-gray-700 text-pink-400 rounded px-3 py-1 cursor-pointer mt-1 inline-block"
            >
              📷 Add media
            </label>
            <div className="flex gap-2 mt-1">
              <button
                className="border bg-gray-700 border-pink-400 text-pink-400 rounded px-3 py-1 mt-2"
                onClick={handleUpload}
              >
                Upload
              </button>
              <button
                className="border bg-gray-700 border-pink-400 text-pink-400 rounded px-3 py-1 mt-2"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-pink-400 text-white rounded px-3 py-1 mt-2"
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <span className="text-gray-500">Difficulty:</span>{" "}
              {localSkill.difficulty}
            </div>
            <div>
              <span className="text-gray-500">Category:</span>{" "}
              {localSkill.categories?.join(", ")}
            </div>
            {skill.youtubeUrl && (
              <div>
                <a
                  href={localSkill.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-pink-400"
                >
                  ▶ Trick example
                </a>
              </div>
            )}

            {skill.prerequisites && skill.prerequisites.length > 0 && (
              <p>Prerequisites: {skill.prerequisites?.join(", ")}</p>
            )}

            <button
              className="bg-gray-700 text-pink-400 rounded px-3 py-1 mt-2"
              onClick={() => setIsPrereqModalOpen(true)}
            >
              Add Prerequisites
            </button>

            {isPrereqModalOpen && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-90 z-50 flex flex-col p-4">
                <h1 className="text-white flex font-bold mb-4 text-center">
                  Prerequisites
                </h1>
                <button
                  className="self-start bg-gray-700 text-pink-400 mb-4 border border-pink-400 rounded px-3 py-2"
                  onClick={() =>
                    navigate(`/skills/${disciplineName}/add-skill`)
                  }
                >
                  + Create New Prerequisite
                </button>

                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-gray-700 mb-4 border border-gray-700 rounded p-2">
                  {availableSkills
                    .filter((s) => s.id !== localSkill.id)
                    .map((s) => (
                      <div
                        key={s.id}
                        className="text-white py-2 px-2 hover:bg-gray-700 cursor-pointer rounded"
                        onClick={() => {
                          /* to do */
                        }}
                      >
                        {s.name}
                      </div>
                    ))}
                </div>

                <button
                  className="self-start bg-gray-700 text-pink-400 rounded border border-pink-400 px-3 py-2"
                  onClick={() => setIsPrereqModalOpen(false)}
                >
                  Close
                </button>
              </div>
            )}

            {skillAttempts.length > 0 && (
              <div className="mt-3">
                <span className="text-gray-500">Best attempts:</span>
                <div className="flex gap-2 mt-1">
                  {skillAttempts.map((attempt) =>
                    isVideo(attempt.userMediaUrl) ? (
                      <div key={attempt.id} className="relative">
                        <video
                          src={attempt.userMediaUrl}
                          className="w-24 h-24 object-cover rounded cursor-pointer"
                          onClick={() =>
                            setSelectedAttemptImage(attempt.userMediaUrl)
                          }
                        />
                        <button
                          className="bg-transparent absolute text-white top-0 right-1"
                          onClick={() => handleDeleteAttempt(attempt.id)}
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div key={attempt.id} className="relative">
                        <img
                          src={attempt.userMediaUrl}
                          className="w-24 h-24 object-cover rounded cursor-pointer"
                          onClick={() =>
                            setSelectedAttemptImage(attempt.userMediaUrl)
                          }
                        />
                        <button
                          className="bg-transparent absolute top-0 right-1 text-white"
                          onClick={() => handleDeleteAttempt(attempt.id)}
                        >
                          ×
                        </button>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {skill.notes && (
              <div className="mt-3">
                <span className="text-gray-500">Notes:</span> {skill.notes}
              </div>
            )}

            {skill.prerequisites && skill.prerequisites.length > 0 && (
              <div className="mt-3">
                <span className="text-gray-500">Prerequisites:</span>
                <div className="flex gap-2 mt-1">
                  {skill.prerequisites.map((prereqId) => (
                    <div
                      key={prereqId}
                      className="bg-gray-700 text-pink-400 rounded px-3 py-1"
                    >
                      {prereqId}
                    </div>
                  ))}
                </div>
                {/* <button
              //   className="bg-gray-700 text-pink-400 rounded px-3 py-1 mt-2"
              //   onClick={(prereqSkillId) => handleAddPrerequisites(prereqSkillId)}
              // >
              //   Add Prerequisites
              </button> */}
              </div>
            )}

            {selectedAttemptImage && (
              <div
                className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
                onClick={() => setSelectedAttemptImage(null)}
              >
                {isVideo(selectedAttemptImage) ? (
                  <video
                    src={selectedAttemptImage}
                    className="max-w-full max-h-full"
                    controls
                  />
                ) : (
                  <img
                    src={selectedAttemptImage}
                    className="max-w-full max-h-full"
                  />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SkillDetails;
