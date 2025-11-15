<!DOCTYPE html>
<html>
<head>
    <title>Real Chat</title>
    <script src="/socket.io/socket.io.js"></script>
    <style>
        body { 
            font-family: Arial; 
            background: linear-gradient(135deg, #667eea, #764ba2);
            margin: 0; padding: 20px; height: 100vh;
        }
        #chat { 
            max-width: 600px; margin: 0 auto; 
            background: white; 
            border-radius: 10px; padding: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        #messages { 
            list-style: none; padding: 0; 
            height: 400px; overflow-y: auto;
            border: 1px solid #ddd; padding: 10px;
            margin-bottom: 20px;
        }
        #form { display: flex; }
        #input { 
            flex: 1; padding: 12px; 
            border: 2px solid #667eea; 
            border-radius: 5px; 
            font-size: 16px;
        }
        button { 
            background: #667eea; color: white; 
            border: none; padding: 12px 24px; 
            border-radius: 5px; margin-left: 10px; 
            cursor: pointer; font-size: 16px;
        }
        button:hover { background: #5a6fd8; }
    </style>
</head>
<body>
    <div id="chat">
        <h2>💬 Real Chat (Socket.io)</h2>
        <ul id="messages"></ul>
        <form id="form">
            <input id="input" autocomplete="off" placeholder="Напишите сообщение..." />
            <button>Отправить</button>
        </form>
    </div>

    <script>
        // Подключаемся к серверу
        const socket = io();
        
        // Получаем элементы DOM
        const form = document.getElementById('form');
        const input = document.getElementById('input');
        const messages = document.getElementById('messages');
        
        // Отправка сообщения
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (input.value) {
                socket.emit('chat message', input.value);
                input.value = '';
            }
        });
        
        // Получение сообщения от сервера
        socket.on('chat message', (msg) => {
            const item = document.createElement('li');
            item.textContent = msg;
            item.style.cssText = 'padding: 8px; border-bottom: 1px solid #eee;';
            messages.appendChild(item);
            messages.scrollTop = messages.scrollHeight;
        });
    </script>
</body>
</html>