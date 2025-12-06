const chatForm = document.getElementById('chatForm');
const chatStream = document.getElementById('chatStream');
const promptField = document.getElementById('prompt');
const resetChatBtn = document.getElementById('resetChat');

const CHAT_API_URL = 'http://211.37.173.148:1117/api/v1/chatGpt/prompt';

function scrollChatToBottom() {
  chatStream?.scrollTo({ top: chatStream.scrollHeight, behavior: 'smooth' });
}

function appendMessage({ role, text }) {
  const article = document.createElement('article');
  article.className = `message message--${role}`;

  const avatar = document.createElement('div');
  avatar.className = 'message__avatar';
  avatar.textContent = role === 'bot' ? 'GPT' : '나';

  const body = document.createElement('div');
  body.className = 'message__body';

  const meta = document.createElement('div');
  meta.className = 'message__meta';
  meta.innerHTML = `<strong>${role === 'bot' ? 'ChatGPT' : '성신혜'}</strong><time>지금</time>`;

  const paragraph = document.createElement('p');
  paragraph.textContent = text;

  body.append(meta, paragraph);
  article.append(avatar, body);
  chatStream?.append(article);
  scrollChatToBottom();

  return { article, textEl: paragraph };
}

async function requestChatCompletion(message) {
  const response = await fetch(CHAT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      {
        role: 'user',
        content: message,
      },
    ]),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || '서버 응답을 받지 못했습니다.');
  }

  const data = await response.json();

  if (Array.isArray(data)) {
    if (typeof data[0] === 'string') return data[0];
    if (data[0]?.content) return data[0].content;
  }

  if (typeof data === 'string') {
    return data;
  }

  if (data?.content) {
    return data.content;
  }

  if (data?.message) {
    return data.message;
  }

  if (Array.isArray(data?.choices) && data.choices[0]?.message?.content) {
    return data.choices[0].message.content;
  }

  return '응답 형식을 이해하지 못했습니다.';
}

chatForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const value = promptField?.value.trim();
  if (!value) return;

  appendMessage({ role: 'user', text: value });
  promptField.value = '';

  const placeholder = appendMessage({ role: 'bot', text: '응답을 생성하고 있어요...' });

  try {
    const reply = await requestChatCompletion(value);
    placeholder.textEl.textContent = reply;
    scrollChatToBottom();
  } catch (error) {
    placeholder.textEl.textContent = `오류가 발생했습니다: ${error.message}`;
    scrollChatToBottom();
  }
});

resetChatBtn?.addEventListener('click', () => {
  window.location.reload();
});
