// Funcionalidades específicas da página dashboard

// Atualizar contador de jogadores e clubes
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se estamos na página de dashboard
    if (!window.location.pathname.includes('dashboard.html')) {
        return;
    }
    
    console.log('Dashboard: Inicializando componentes');
    
    // Obter dados
    const players = [];
    const clubs = [];
    const activePlayers = 0;
    
    // Atualizar contadores
    const counters = document.querySelectorAll('.text-3xl.font-bold.text-gray-800');
    if (counters && counters.length >= 3) {
        counters[0].textContent = players.length;
        counters[1].textContent = clubs.length;
        counters[2].textContent = activePlayers;
    }
    
    // Preencher últimos jogadores registrados
    const playersContainer = document.querySelector('.bg-white.rounded-lg.shadow-md.p-6:nth-of-type(1) div');
    if (playersContainer && players.length > 0) {
        playersContainer.innerHTML = '';
        const latestPlayers = [...players].sort((a, b) => b.id - a.id).slice(0, 5);
        
        latestPlayers.forEach(player => {
            playersContainer.innerHTML += `
                <div class="flex items-center py-2 border-b">
                    <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3 text-gray-700">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="flex-1">
                        <p class="font-semibold">${player.name}</p>
                        <p class="text-xs text-gray-500">${player.position} - ${player.club || 'Sem clube'}</p>
                    </div>
                </div>
            `;
        });
    }
    
    // Preencher últimos clubes registrados
    const clubsContainer = document.querySelector('.bg-white.rounded-lg.shadow-md.p-6:nth-of-type(2) div');

    if (clubsContainer && clubs.length > 0) {
        clubsContainer.innerHTML = '';
        const latestClubs = [...clubs].sort((a, b) => b.id - a.id).slice(0, 5);
        
        latestClubs.forEach(club => {
            clubsContainer.innerHTML += `
                <div class="flex items-center py-2 border-b">
                    <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3 text-gray-700">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="flex-1">
                        <p class="font-semibold">${club.name}</p>
                        <p class="text-xs text-gray-500">${club.location}</p>
                    </div>
                </div>
            `;
        });
    }
}); 