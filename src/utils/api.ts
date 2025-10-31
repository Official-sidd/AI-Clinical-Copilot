// src/api/fetchTranscript.js
// export const fetchTranscript = async () => {
//   try {
//     const response = await fetch("http://192.168.1.32:5000/transcribe_with_notes"); 
//     if (!response.ok) throw new Error("Failed to fetch transcript");
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching transcript:", error);
//     throw error;
//   }
// };
// const BASE_URL = process.env.BASE_URL;

export const fetchTranscript = async (audioFile) => {
  try {
    const formData = new FormData();
    formData.append("audio", audioFile, "recording.mp3");

    // const response = await fetch(`${BASE_URL}/transcribe_with_notes`, {
    const response = await fetch("https://bk6xbdf1-5000.inc1.devtunnels.ms/transcribe_with_notes", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Failed to fetch transcript");
    return await response.json();
  } catch (error) {
    console.error("Error fetching transcript:", error);
    throw error;
  }
};
