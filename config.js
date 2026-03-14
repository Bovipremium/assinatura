// ============================================
// CONFIGURAÇÃO - ASSINATURA DIGITAL
// ============================================
// URL do Google Apps Script (Backend)
// ============================================

const CONFIG = {
  // URL do deployment do Google Apps Script
  // Exemplo: https://script.google.com/macros/d/[ID]/usercontent
  API_URL: 'https://script.google.com/macros/s/AKfycbyoBTL1uzdaHm9LLVLIFdlGDdT7_KpP3kh3UkyJyysd39AOmZBKEdKh9JKHduMHVg0G/exec',
  
  // Versão da API
  VERSION: '1.0',
  
  // Timeout para requisições (ms)
  TIMEOUT: 30000,
  
  // Modo debug (mostrar logs no console)
  DEBUG: true
};

// ============================================
// COMO OBTER A URL DO DEPLOYMENT
// ============================================
/*
1. Abrir Google Apps Script
2. Copiar o arquivo: backend_simplificado.gs
3. Colar no Google Apps Script
4. Deploy → Nova implantação
5. Tipo: Aplicativo da web
6. Executar como: Sua conta
7. Acessível por: Qualquer pessoa
8. Copiar a URL gerada (algo como):
   https://script.google.com/macros/d/[ID]/usercontent

9. Colar a URL aqui (linha 13):
   API_URL: 'https://script.google.com/macros/d/[ID]/usercontent'
*/

// ============================================
// VALIDAR CONFIGURAÇÃO
// ============================================
if (CONFIG.API_URL.includes('YOUR_DEPLOYMENT_ID')) {
  console.warn('⚠️ AVISO: Você precisa atualizar a URL do API em config.js');
  console.warn('Instruções em: https://seu-site.com/config.js');
}

// ============================================
// FUNÇÃO AUXILIAR PARA DEBUG
// ============================================
function logConfig() {
  if (CONFIG.DEBUG) {
    console.log('📋 Configuração de Assinatura:');
    console.log('API URL:', CONFIG.API_URL);
    console.log('Version:', CONFIG.VERSION);
    console.log('Timeout:', CONFIG.TIMEOUT + 'ms');
    console.log('Debug:', CONFIG.DEBUG ? 'ON ✅' : 'OFF ❌');
  }
}

// Log ao carregar
if (typeof window !== 'undefined') {
  logConfig();
}
