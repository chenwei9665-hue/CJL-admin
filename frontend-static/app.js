const messagesEl = document.getElementById('messages');
const inputEl = document.getElementById('questionInput');
const sendBtn = document.getElementById('sendBtn');

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function appendSystemCard(msg) {
  const cls = msg.type === '异常预警' ? 'card alert' : 'card';
  const html = `
    <div class="${cls}">
      <h3>${escapeHtml(msg.title || '系统消息')}</h3>
      <span class="type">${escapeHtml(msg.type || '消息')}</span>
      <div>${escapeHtml(msg.body || '')}</div>
      <small>${escapeHtml(msg.timestamp || '')}</small>
    </div>
  `;
  messagesEl.insertAdjacentHTML('beforeend', html);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function appendBubble(text, role = 'assistant') {
  const html = `<div class="bubble ${role}">${escapeHtml(text)}</div>`;
  messagesEl.insertAdjacentHTML('beforeend', html);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

async function loadMessages() {
  try {
    const res = await fetch('/api/messages');
    const payload = await res.json();
    (payload.data || []).forEach(appendSystemCard);
  } catch (err) {
    appendBubble('系统消息加载失败，请检查服务是否启动。', 'assistant');
  }
}

async function ask(question) {
  const q = (question || inputEl.value).trim();
  if (!q) return;
  appendBubble(q, 'user');
  inputEl.value = '';

  try {
    const res = await fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q })
    });
    const payload = await res.json();
    appendBubble(payload.answer || '未返回结果', 'assistant');
  } catch (err) {
    appendBubble('请求失败，请稍后重试。', 'assistant');
  }
}

sendBtn.addEventListener('click', () => ask());
inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') ask();
});
document.querySelectorAll('.quick button').forEach((btn) => {
  btn.addEventListener('click', () => ask(btn.dataset.question));
});

loadMessages();
