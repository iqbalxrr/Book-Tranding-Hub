import fetch from "node-fetch";

const API_KEY = "AIzaSyCdUZGkuFHtq1Re83_dKNWNgiXBgICYRr0";

async function checkModels() {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );
    const data = await res.json();

    if (data.models) {
      console.log("✅ Available Gemini Models:");
      data.models.forEach((m) => console.log("-", m.name));
    } else {
      console.error("⚠️ No models found:", data);
    }
  } catch (err) {
    console.error("❌ Error fetching models:", err);
  }
}

checkModels();
