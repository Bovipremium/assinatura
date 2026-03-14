// ============================================
// GERENCIADOR DE AUTENTICAÇÃO
// ============================================
// Sem palavra-chave (acesso direto)
// Device ID único por navegador
// ============================================

const AuthManager = {
  
  // ============================================
  // 🆔 OBTER OU GERAR DEVICE ID
  // ============================================
  getDeviceId: function() {
    let deviceId = localStorage.getItem('deviceId');
    
    if (!deviceId) {
      // Gerar novo Device ID único e seguro
      const array = new Uint8Array(16);
      crypto.getRandomValues(array);
      deviceId = 'DEV_' + Array.from(array, b => 
        b.toString(16).padStart(2, '0')
      ).join('');
      
      localStorage.setItem('deviceId', deviceId);
      console.log('✅ Novo Device ID gerado:', deviceId);
    } else {
      console.log('✅ Device ID recuperado:', deviceId);
    }
    
    return deviceId;
  },
  
  // ============================================
  // 📡 FAZER REQUISIÇÃO SEGURA
  // ============================================
  requisicaoSegura: function(url, options = {}) {
    // Adicionar timeout se não houver
    if (!options.timeout) {
      options.timeout = CONFIG.TIMEOUT || 30000;
    }
    
    // Log em debug
    if (CONFIG.DEBUG) {
      console.log('📡 Requisição:', url.substring(0, 100) + '...');
      if (options.method === 'POST') {
        console.log('📦 Método: POST');
      }
    }
    
    // Implementar timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout);
    
    return fetch(url, {
      ...options,
      signal: controller.signal
    })
    .then(response => {
      clearTimeout(timeoutId);
      return response;
    })
    .catch(error => {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Requisição expirou (timeout). Verifique sua conexão.');
      }
      throw error;
    });
  },
  
  // ============================================
  // 🔐 VALIDAR RESPOSTA DO SERVIDOR
  // ============================================
  validarResposta: function(response) {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response;
  },
  
  // ============================================
  // 📊 LOG DE REQUISIÇÃO
  // ============================================
  logResposta: function(dados, tipo = 'GET') {
    if (CONFIG.DEBUG) {
      console.log(`✅ Resposta ${tipo}:`, dados);
    }
  },
  
  // ============================================
  // ❌ LOG DE ERRO
  // ============================================
  logErro: function(erro, contexto = '') {
    console.error(`❌ Erro ${contexto}:`, erro.message || erro);
  }
};

// ============================================
// INICIALIZAR AUTENTICAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const deviceId = AuthManager.getDeviceId();
  if (CONFIG.DEBUG) {
    console.log('🔐 Autenticação inicializada');
    console.log('Device ID:', deviceId);
  }
});
