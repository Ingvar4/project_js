const overlay = document.getElementById('overlay');

//7. overlay, спиннер
export function showLoader() {
  overlay.style.display = 'flex';
}

export function hideLoader() {
  overlay.style.display = 'none';
}