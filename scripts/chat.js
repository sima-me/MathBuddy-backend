const apiUrl = "http://127.0.0.1:5000/chat"; // This will be updated later to Render URL

document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("userInput");

  if (inputField) {
    inputField.addEventListener("keydown", function (e) {
      if (e.key === "Enter") sendMessage();
    });
  }
});

async function sendMessage() {
  const input = document.getElementById("userInput").value.trim();
  if (!input) return;

  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML += `<p><strong>You:</strong> ${input}</p>`;
  messagesDiv.innerHTML += `<p><em>MathBuddy is typing...</em></p>`;
  document.getElementById("userInput").value = "";

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        topic: "general", // default topic
        grade: "all", // default grade
      }),
    });

    const data = await res.json();

    messagesDiv.innerHTML = messagesDiv.innerHTML.replace(
      `<p><em>MathBuddy is typing...</em></p>`,
      ""
    );

    messagesDiv.innerHTML += `<p><strong>MathBuddy:</strong> ${data.reply}</p>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  } catch (err) {
    messagesDiv.innerHTML += `<p><strong>MathBuddy:</strong> ⚠️ Something went wrong.</p>`;
  }
}
