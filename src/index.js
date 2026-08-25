const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store"
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: JSON_HEADERS
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/health") {
      return jsonResponse({ status: "ok" });
    }

    return jsonResponse(
      {
        error: "project_requirements_required",
        message: "Для реалізації проєкту потрібно надати детальне технічне завдання.",
        questions: [
          "Яке призначення проєкту та яку проблему він має вирішувати?",
          "Хто користувачі системи та які основні сценарії використання?",
          "Які функції є обов'язковими для першої версії?",
          "Який інтерфейс потрібен: HTTP API, вебзастосунок, Telegram-бот, фоновий процес чи інший варіант?",
          "Чи потрібні авторизація та ролі користувачів?",
          "Які дані потрібно зберігати та як довго?",
          "Які зовнішні сервіси або API потрібно інтегрувати?",
          "Який формат вхідних даних і очікуваного результату?",
          "Чи є нефункціональні вимоги щодо навантаження, безпеки, локалізації або строків?"
        ]
      },
      400
    );
  }
};
