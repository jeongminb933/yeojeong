const functions = require("firebase-functions");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors")({ origin: true });

const genAI = new GoogleGenerativeAI("AIzaSyB3lozLx9aSmh0DXn0kn-V0ad4RIZXa-mM");

exports.generateTravelPlan = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { companion, style, budget, location, extra } = req.body;

    const prompt = `
너는 전문 여행 플래너야.
나는 2025년 7월 1일부터 3일까지 ${location}을 여행할 거야.
동반자는 ${companion}, 스타일은 ${style}, 예산은 ${budget}, 추가 요청: ${extra || '없음'}

📌 반드시 순수한 JSON으로, 아래 포맷처럼 응답해줘.
{
  "day1": [{ "time": "09:00", "activity": "..." }],
  "day2": [],
  "day3": []
}
`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json({ error: "Gemini 응답 실패", detail: e.toString() });
    }
  });
});