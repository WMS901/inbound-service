function generateSku(category, name) {
    const categoryCode = category.substring(0, 3).toUpperCase();
    const nameCode = name.replace(/\s+/g, '').substring(0, 3).toUpperCase();
    const dateCode = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const randomNum = Math.floor(100 + Math.random() * 900); // 100~999 랜덤 숫자
  
    return `${categoryCode}-${nameCode}-${dateCode}-${randomNum}`;
  }
  
  module.exports = { generateSku };
  