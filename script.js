let totalSecs = 120;
function updateCD() {
  const m = Math.floor(totalSecs/60), s = totalSecs%60;
  document.getElementById('cd-mins').textContent = String(m).padStart(2,'0');
  document.getElementById('cd-secs').textContent = String(s).padStart(2,'0');
  totalSecs > 0 ? totalSecs-- : (totalSecs = 120);
}
updateCD(); setInterval(updateCD, 1000);

function openModal() { document.getElementById('modalOverlay').classList.add('open'); document.body.style.overflow='hidden'; }
function closeModal() { document.getElementById('modalOverlay').classList.remove('open'); document.body.style.overflow=''; }
function handleOverlayClick(e) { if(e.target===document.getElementById('modalOverlay')) closeModal(); }

document.getElementById('phoneInput').addEventListener('input', function() {
  this.value = this.value.replace(/[^0-9 ]/g,'');
  document.getElementById('phoneError').style.display='none';
});

async function submitForm() {
  const name = document.getElementById('nameInput').value.trim();
  const phone = document.getElementById('phoneInput').value.replace(/\s/g,'');
  if(!name) { document.getElementById('nameError').style.display='block'; return; }
  if(phone.length < 9) { document.getElementById('phoneError').style.display='block'; return; }
  document.getElementById('nameError').style.display='none';
  document.getElementById('phoneError').style.display='none';
  const btn = document.getElementById('submitBtn');
  btn.disabled=true; btn.innerHTML='<span class="spinner"></span>Saqlanmoqda...';
  const fullPhone = document.getElementById('countryCode').value + phone;
  const now = new Date().toLocaleString('uz-UZ',{timeZone:'Asia/Tashkent'});
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', fullPhone);
    formData.append('date', now);
    formData.append('source', 'masterclass-landing');
    await fetch('https://script.google.com/macros/s/AKfycbwtFRSM-DtFnoXaTTtCt7xXNaQUyVsKyVJ5MFkFuQWhdkZA4WHoacRivE8BP934ywaKlw/exec',{
      method:'POST', mode:'no-cors',
      body: formData
    });
  } catch(e){}
  if(typeof fbq !== 'undefined') fbq('track', 'Lead');
  document.getElementById('s1').textContent='✓'; document.getElementById('s1').classList.remove('active'); document.getElementById('s1').classList.add('done');
  document.getElementById('sl1').classList.add('done');
  document.getElementById('s2').textContent='2'; document.getElementById('s2').classList.add('active');
  document.getElementById('page1').classList.remove('active'); document.getElementById('page3').classList.add('active');
}

function markDone() {
  if(typeof fbq !== 'undefined') fbq('track', 'Subscribe');
  setTimeout(()=>{ document.querySelector('.step3-content').style.display='none'; document.getElementById('successMsg').style.display='block'; setTimeout(closeModal,3000); },800);
}
