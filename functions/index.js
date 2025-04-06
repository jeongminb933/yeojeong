const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const axios = require("axios");

exports.generateTravelPlan = onRequest(async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCt_V_UyiwHBl3uNPuTuFJPJX3i0DYzbAo`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    // ✅ Gemini 응답 중 텍스트만 추출
    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      res.status(500).json({ error: "Gemini 응답이 비어있습니다." });
      return;
    }

    // ✅ 클라이언트에 text만 전달
    res.status(200).json({ text });

  } catch (error) {
    logger.error("Gemini 호출 실패:", error.message);
    res.status(500).json({ error: "Gemini 호출 중 오류 발생" });
  }
});
