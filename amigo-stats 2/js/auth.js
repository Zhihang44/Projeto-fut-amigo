// Simulação de autenticação com usuários armazenados localmente
const users = [
    {
        email: 'admin@exemplo.com',
        password: 'admin123',
        name: 'Administrador',
        role: 'admin'
    },
    {
        email: 'usuario@exemplo.com',
        password: 'usuario123',
        name: 'Usuário Teste',
        role: 'user'
    }
];

// Função para verificar credenciais e fazer login
function login(email, password) {
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Armazenar informações do usuário no localStorage (em produção, usar JWT seria mais seguro)
        const userData = {
            email: user.email,
            name: user.name,
            role: user.role,
            isLoggedIn: true
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        return true;
    }
    return false;
}

// Função para verificar se o usuário está logado
function isLoggedIn() {
    const userData = localStorage.getItem('userData');
    if (!userData) return false;
    
    const user = JSON.parse(userData);
    return user.isLoggedIn === true;
}

// Função para fazer logout
function logout() {
    localStorage.removeItem('userData');
    window.location.href = 'index.html';
}

// Recuperar dados do usuário atual
function getCurrentUser() {
    const userData = localStorage.getItem('userData');
    if (!userData) return null;
    
    return JSON.parse(userData);
}

// Lidar com o envio do formulário de login
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (login(email, password)) {
                window.location.href = 'pages/dashboard.html';
            } else {
                alert('Email ou senha incorretos. Tente novamente.');
            }
        });
    }
    
    // Redirecionar para a página de login se não estiver logado (exceto na própria página de login)
    if (!isLoggedIn() && !window.location.href.includes('index.html')) {
        window.location.href = '../index.html';
    }
    
    // Configurar o botão de logout, se existir
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
}); 